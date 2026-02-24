import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterLikeUseCase } from "@/use-cases/factories/like/make-register-like-post-use-case"
import { LikePresenter } from "../../presenters/like-presenter"


export async function registerLikePost (request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerLikeBodySchema = z.object({
            usuarioId: z.string(),
            postId: z.string(),
        })
    
        const { usuarioId, postId} = registerLikeBodySchema.parse(request.body)
   
        const registerLikeUseCase = makeRegisterLikeUseCase()
        const { like } = await registerLikeUseCase.execute({
            usuarioId,
            postId
        })
    
        return reply.status(201).send(LikePresenter.toHTTP(like))
    } catch (error){

        throw error
    }


}