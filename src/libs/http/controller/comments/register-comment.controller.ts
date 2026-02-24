import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterCommentUseCase } from "@/use-cases/factories/comment/make-register-comment-use-case"
import { ComentarioPresenter } from "../../presenters/comment-presenter"


export async function registerComment (request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerCommentBodySchema = z.object({
            conteudo: z.string().min(1).max(1000),
            usuarioId: z.string(),
            postId: z.string()
        })
    
        const {conteudo, usuarioId, postId} = registerCommentBodySchema.parse(request.body)
   
        const registerCommentUseCase = makeRegisterCommentUseCase()
        const { comment } = await registerCommentUseCase.execute({
            conteudo,
            usuarioId,
            postId
        })
    
        return reply.status(201).send(ComentarioPresenter.toHTTP(comment))
    } catch (error){

        throw error
    }


}