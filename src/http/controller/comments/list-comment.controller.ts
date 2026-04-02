import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListCommentUseCase } from '@/use-cases/factories/comment/make-list-comment-use-case'
import { ComentarioPresenter } from '../../presenters/comment-presenter'

export async function listComments(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const listCommentUseCase = makeListCommentUseCase()

  const { comments } = await listCommentUseCase.execute()

  return reply.status(200).send(ComentarioPresenter.toHTTP(comments))
}
