import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterPostUseCase } from "@/use-cases/factories/post/make-register-post-use-case"
import { PostPresenter } from "../../presenters/post-presenter"

export async function registerPost (request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerPostBodySchema = z.object({
            conteudo: z.string().min(1).max(1000),
            usuarioId: z.string()
        })
    
        const {conteudo, usuarioId} = registerPostBodySchema.parse(request.body)
   
        const registerPostUseCase = makeRegisterPostUseCase()
        const { post } = await registerPostUseCase.execute({
            conteudo,
            usuarioId,
        })
    
        return reply.status(201).send(PostPresenter.toHTTP(post))
    } catch (error){

        throw error
    }


}