import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeListPostByUserUseCase } from "@/use-cases/factories/post/make-list-posts-by-user"
import { PostPresenter } from "../../presenters/post-presenter"

export async function listPostsByUser (request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            usuarioId: z.string()
        })
    
        const { usuarioId } = getParamsSchema.parse(request.params)
   
        const listPostsByUserUseCase = makeListPostByUserUseCase()
        const { posts } = await listPostsByUserUseCase.execute({
            usuarioId
        })

        if(posts.length === 0){
            throw new ResourceNotFoundError()
        }
    
        return reply.status(200).send(PostPresenter.toHTTP(posts))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}