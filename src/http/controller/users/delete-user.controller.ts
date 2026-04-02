import type { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteUserUseCase } from '@/use-cases/factories/user/make-delete-user'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sub } = request.user as { sub: string }

    const deleteUserUseCase = makeDeleteUserUseCase()

    await deleteUserUseCase.execute({
      publicId: sub,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
