import z  from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeGetPostUseCase } from "@/use-cases/factories/post/make-get-post"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { PostPresenter } from "../../presenters/post-presenter"


export async function getPost (request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string()
        })
    
        const { publicId } = getParamsSchema.parse(request.params)
   
        const getPostUseCase = makeGetPostUseCase()
        const { post } = await getPostUseCase.execute({
            publicId
        })
    
        return reply.status(200).send(PostPresenter.toHTTP(post))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}