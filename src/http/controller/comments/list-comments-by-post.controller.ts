import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeListComentarioByPostUseCase } from "@/use-cases/factories/comment/make-list-comment-by-post"
import { ComentarioPresenter } from "../../presenters/comment-presenter"

export async function listComentariosByPost (request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            postId: z.string()
        })
        const {postId} = getParamsSchema.parse(request.params)

        const listComentariosByPostUseCase = makeListComentarioByPostUseCase()
        const { comentarios } = await listComentariosByPostUseCase.execute({
            postId
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