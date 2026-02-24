import type { FastifyReply, FastifyRequest } from "fastify"
import { PostPresenter } from "../../presenters/post-presenter"
import { makeListPostUseCase } from "@/use-cases/factories/post/make-list-posts"


export async function listPosts (_request: FastifyRequest, reply: FastifyReply) {
    try {
        const listPostUseCase = makeListPostUseCase()
        
        const { posts } = await listPostUseCase.execute()
    
        return reply.status(200).send(PostPresenter.toHTTP(posts))
    } catch (error){

        throw error
    }


}