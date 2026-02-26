import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeListComentariosByUserUseCase } from "@/use-cases/factories/comment/make-list-comments-by-user"
import { ComentarioPresenter } from "../../presenters/comment-presenter"

export async function listComentariosByUser (request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            usuarioId: z.string()
        })
    
        const { usuarioId } = getParamsSchema.parse(request.params)
   
        const listComentariosByUserUseCase = makeListComentariosByUserUseCase()
        const { comentarios } = await listComentariosByUserUseCase.execute({
            usuarioId
        })

        if(comentarios.length === 0){
            throw new ResourceNotFoundError()
        }
    
        return reply.status(200).send(ComentarioPresenter.toHTTP(comentarios))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}