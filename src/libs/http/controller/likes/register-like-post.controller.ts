import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterLikePostUseCase } from "@/use-cases/factories/like/make-register-like-post-use-case"
import { LikePresenter } from "../../presenters/like-presenter"
import { LikeAlreadyExistsError } from "@/use-cases/errors/like-already-existis-error"


export async function registerLikePost (request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerLikeBodySchema = z.object({
            usuarioId: z.string(),
        })
    
        const { usuarioId } = registerLikeBodySchema.parse(request.body)
        const { postId } = request.params as { postId: string }
        
        const registerLikeUseCase = makeRegisterLikePostUseCase()
        const { like } = await registerLikeUseCase.execute({
            usuarioId,
            postId
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