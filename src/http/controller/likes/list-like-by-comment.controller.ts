import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListLikeByComentarioUseCase } from '@/use-cases/factories/like/make-list-by-comment-use-case'
import { LikePresenter } from '../../presenters/like-presenter'

export async function listLikesByComentario(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
      comentarioId: z.string(),
    })
    const { comentarioId } = getParamsSchema.parse(request.params)

    const listLikesByComentarioUseCase = makeListLikeByComentarioUseCase()
    const { likes } = await listLikesByComentarioUseCase.execute({
      comentarioId,
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
