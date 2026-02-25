import z  from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { LikePresenter } from "../../presenters/like-presenter"
import { makeGetLikeUseCase } from "@/use-cases/factories/like/make-get-like-use-case"


export async function getLike (request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string()
        })
    
        const { publicId } = getParamsSchema.parse(request.params)
   
        const getLikeUseCase = makeGetLikeUseCase()
        const { like } = await getLikeUseCase.execute({
            publicId
        })
    
        return reply.status(200).send(LikePresenter.toHTTP(like))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}