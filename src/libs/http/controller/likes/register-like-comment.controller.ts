import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterLikeCommentUseCase } from "@/use-cases/factories/like/make-register-like-comment-use-case"
import { LikePresenter } from "../../presenters/like-presenter"
import { LikeAlreadyExistsError } from "@/use-cases/errors/like-already-existis-error"


export async function registerLikeComment (request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerLikeBodySchema = z.object({
            usuarioId: z.string(),
        })
    
        const { usuarioId } = registerLikeBodySchema.parse(request.body)
        const { comentarioId } = request.params as { comentarioId: string }
   
        const registerLikeUseCase = makeRegisterLikeCommentUseCase()
        const { like } = await registerLikeUseCase.execute({
            usuarioId,
            comentarioId
            })
    
        return reply.status(201).send(LikePresenter.toHTTP(like))
    } catch (error){
        if(error instanceof LikeAlreadyExistsError){
            return reply.status(409).send({
                message: error.message
            })
        }
        throw error
    }


}