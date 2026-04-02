import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListLikeByPostUseCase } from '@/use-cases/factories/like/make-list-like-by-post-use-case'
import { LikePresenter } from '../../presenters/like-presenter'

export async function listLikesByPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
      postId: z.string(),
    })
    const { postId } = getParamsSchema.parse(request.params)

    const listLikesByPostUseCase = makeListLikeByPostUseCase()
    const { likes } = await listLikesByPostUseCase.execute({
      postId,
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
