import z  from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { ComentarioPresenter } from "../../presenters/comment-presenter"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeUpdateCommentUseCase } from "@/use-cases/factories/comment/make-update-comment-use-case"

export async function updateComment (request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateParamsSchema = z.object({
            publicId: z.string(),
            conteudo: z.string().optional()
        })
    
        const { publicId } = updateParamsSchema.parse(request.params)
        const { sub } = request.user

        const updateBodySchema = z.object({
            conteudo: z.string().min(1).max(1000).optional(),
        })
    
        const {conteudo} = updateBodySchema.parse(request.body)
   
        const updateCommentUseCase = makeUpdateCommentUseCase()
        const { comment } = await updateCommentUseCase.execute({
            usuarioId: sub,
            publicId,
            conteudo
        })
    
        return reply.status(200).send(ComentarioPresenter.toHTTP(comment))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}