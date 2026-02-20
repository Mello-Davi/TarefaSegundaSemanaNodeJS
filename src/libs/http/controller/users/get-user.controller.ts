import z  from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeGetUseCase } from "@/use-cases/factories/make-get-user"
import { UserPresenter } from "../../presenters/user-presenter"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"


export async function get (request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string()
        })
    
        const { publicId } = getParamsSchema.parse(request.params)
   
        const getUserUseCase = makeGetUseCase()
        const { user } = await getUserUseCase.execute({
            publicId
        })
    
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        throw error
    }


}