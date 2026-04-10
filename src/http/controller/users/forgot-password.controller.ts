import type { FastifyReply, FastifyRequest } from 'fastify'
import { messages } from '@/constants/messages'
import { forgotPasswordSchema } from '@/http/schemas/users/forgot-password-schema'
import { logger } from '@/libs/logger'
import { forgotPasswordHtmlTemplate } from '@/templates/forgot-password/forgot-password-html'
import { forgotPasswordTextTemplate } from '@/templates/forgot-password/forgot-password-text'
import { UserNotFoundForPasswordResetError } from '@/use-cases/errors/user-not-found-for-password-reset-error'
import { makeForgotPasswordUseCase } from '@/use-cases/factories/user/make-forgot-password'
import { makeSendEmailUseCase } from '@/use-cases/factories/user/make-send-email'

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { login } = forgotPasswordSchema.parse(request.body)

    const forgotPasswordUseCase = makeForgotPasswordUseCase()

    const { user, token } = await forgotPasswordUseCase.execute({ login })

    const sendEmailUseCase = makeSendEmailUseCase()

    await sendEmailUseCase.execute({
      to: user.email,
      subject: messages.email.passwordRecoverySubject,
      message: forgotPasswordTextTemplate(user.nome, token),
      html: forgotPasswordHtmlTemplate(user.nome, token),
    })

    logger.info({ targetId: user.publicId }, 'Password reset email sent')

    return reply
      .status(200)
      .send({ message: messages.info.passwordResetGeneric })
  } catch (error) {
    console.log(error)
    if (error instanceof UserNotFoundForPasswordResetError) {
      return reply.status(200).send({ message: error.message })
    }

    throw error
  }
}
