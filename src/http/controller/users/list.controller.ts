import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListUseCase } from '@/use-cases/factories/user/make-list-users'
import { UserPresenter } from '../../presenters/user-presenter'

export async function list(_request: FastifyRequest, reply: FastifyReply) {
  const listUserUseCase = makeListUseCase()

  const { users } = await listUserUseCase.execute()

  return reply.status(200).send(UserPresenter.toHTTP(users))
}
