import type { FastifyReply, FastifyRequest } from 'fastify'

import { resetPasswordSchema } from '@/http/schemas/users/reset-password-schema.js'
import { logger } from '@/libs/logger'
import { InvalidTokenError } from '@/use-cases/errors/invalid-token-error.js'
import { makeResetPasswordUseCase } from '@/use-cases/factories/user/make-reset-password'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { password, token } = resetPasswordSchema.parse(request.body)

  try {
    const resetPasswordUseCase = makeResetPasswordUseCase()

    const { user } = await resetPasswordUseCase.execute({ password, token })

    logger.info({ userId: user.id }, 'Password changed successfully!')

    return reply.status(200).send({ message: 'Password changed successfully!' })
  } catch (error) {
    console.log(error)
    if (error instanceof InvalidTokenError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
