import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListPostUseCase } from '@/use-cases/factories/post/make-list-posts'
import { PostPresenter } from '../../presenters/post-presenter'

export async function listPosts(_request: FastifyRequest, reply: FastifyReply) {
  const listPostUseCase = makeListPostUseCase()

  const { posts } = await listPostUseCase.execute()

  return reply.status(200).send(PostPresenter.toHTTP(posts))
}
