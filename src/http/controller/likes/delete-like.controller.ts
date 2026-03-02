import z  from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeDeleteLikeUseCase } from "@/use-cases/factories/like/make-delete-like-use-case"


export async function deleteLike (request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteLikeParamsSchema = z.object({
            publicId: z.string()
        })
        
        const { sub } = request.user
        const { publicId } = deleteLikeParamsSchema.parse(request.params)
   
        const deleteLikeUseCase = makeDeleteLikeUseCase()
        await deleteLikeUseCase.execute({
            usuarioPublicId: sub,
            publicId
        })
        return reply.status(200).send()
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}