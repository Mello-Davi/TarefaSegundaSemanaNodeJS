import z  from "zod"
import { makeDeleteCommentUseCase } from "@/use-cases/factories/comment/make-delete-comment-use-case"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import type { FastifyReply, FastifyRequest } from "fastify"


export async function deleteComment (request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteCommentParamsSchema = z.object({
            publicId: z.string()
        })
    
        const { publicId } = deleteCommentParamsSchema.parse(request.params)
        const { sub } = request.user

        const deleteCommentUseCase = makeDeleteCommentUseCase()
        await deleteCommentUseCase.execute({
            publicId,
            usuarioId: sub
        })
        return reply.status(200).send()
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}