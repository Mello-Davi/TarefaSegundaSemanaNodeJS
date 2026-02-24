import z  from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeGetCommentUseCase } from "@/use-cases/factories/comment/make-get-use-case"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { ComentarioPresenter } from "../../presenters/comment-presenter"


export async function getComment (request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string()
        })
    
        const { publicId } = getParamsSchema.parse(request.params)
   
        const getCommentUseCase = makeGetCommentUseCase()
        const { comment } = await getCommentUseCase.execute({
            publicId
        })
    
        return reply.status(200).send(ComentarioPresenter.toHTTP(comment))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}