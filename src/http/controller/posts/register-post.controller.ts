import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeRegisterPostUseCase } from '@/use-cases/factories/post/make-register-post-use-case'
import { PostPresenter } from '../../presenters/post-presenter'

export async function registerPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPostBodySchema = z.object({
    titulo: z.string().min(1).max(20),
    conteudo: z.string().min(1).max(1000),
  })

  const { titulo, conteudo } = registerPostBodySchema.parse(request.body)
  const { sub } = request.user

  const registerPostUseCase = makeRegisterPostUseCase()
  const { post } = await registerPostUseCase.execute({
    titulo,
    conteudo,
    usuarioPublicId: sub,
  })

  return reply.status(201).send(PostPresenter.toHTTP(post))
}
