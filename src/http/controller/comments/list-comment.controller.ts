import type { FastifyReply, FastifyRequest } from "fastify"
import { ComentarioPresenter } from "../../presenters/comment-presenter"
import { makeListCommentUseCase } from "@/use-cases/factories/comment/make-list-comment-use-case"



export async function listComments (_request: FastifyRequest, reply: FastifyReply) {
    try {
        const listCommentUseCase = makeListCommentUseCase()
        
        const { comments } = await listCommentUseCase.execute()
    
        return reply.status(200).send(ComentarioPresenter.toHTTP(comments))
    } catch (error){

        throw error
    }


}