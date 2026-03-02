import type { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterLikeCommentUseCase } from "@/use-cases/factories/like/make-register-like-comment-use-case"
import { LikePresenter } from "../../presenters/like-presenter"
import { UserLikeAlreadyExistsError } from "@/use-cases/errors/like-already-existis-error"


export async function registerLikeComment (request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sub } = request.user
        const { comentarioId } = request.params as { comentarioId: string }
   
        const registerLikeUseCase = makeRegisterLikeCommentUseCase()
        const { like } = await registerLikeUseCase.execute({
            usuarioPublicId: sub,
            comentarioId
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