import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListLikeByUserUseCase } from '@/use-cases/factories/like/make-list-like-by-user-use-case'
import { LikePresenter } from '../../presenters/like-presenter'

export async function listLikesByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
      usuarioId: z.string(),
    })

    const { usuarioId } = getParamsSchema.parse(request.params)

    const listLikesByUserUseCase = makeListLikeByUserUseCase()
    const { likes } = await listLikesByUserUseCase.execute({
      usuarioId,
    })

    if (likes.length === 0) {
      throw new ResourceNotFoundError()
    }

    return reply.status(200).send(LikePresenter.toHTTP(likes))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
