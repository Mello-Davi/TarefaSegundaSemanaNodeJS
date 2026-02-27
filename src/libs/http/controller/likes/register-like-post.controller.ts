import type { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterLikePostUseCase } from "@/use-cases/factories/like/make-register-like-post-use-case"
import { LikePresenter } from "../../presenters/like-presenter"
import  {UserLikeAlreadyExistsError } from "@/use-cases/errors/like-already-existis-error"


export async function registerLikePost (request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sub } = request.user
        console.log(request.user)
        
        const { postId } = request.params as { postId: string }
        
        const registerLikeUseCase = makeRegisterLikePostUseCase()
        const { like } = await registerLikeUseCase.execute({
            usuarioPublicId: sub,
            postId
        })
    
        return reply.status(201).send(LikePresenter.toHTTP(like))
    } catch (error){
        if(error instanceof UserLikeAlreadyExistsError){
            return reply.status(409).send({
                message: error.message
            })
        }
        throw error
    }


}