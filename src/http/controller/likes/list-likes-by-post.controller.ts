import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { LikePresenter } from "../../presenters/like-presenter"
import { makeListLikeByPostUseCase } from "@/use-cases/factories/like/make-list-like-by-post-use-case"

export async function listLikesByPost (request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            postId: z.string()
        })
        const {postId} = getParamsSchema.parse(request.params)

        const listLikesByPostUseCase = makeListLikeByPostUseCase()
        const { likes } = await listLikesByPostUseCase.execute({
            postId
        })
        

        if(likes.length === 0){
            throw new ResourceNotFoundError()
        }
    
        return reply.status(200).send(LikePresenter.toHTTP(likes))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}