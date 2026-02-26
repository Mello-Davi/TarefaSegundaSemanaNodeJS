import type { PostsRepository } from "@/repositories/posts-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { ComentarioWithRelations, ComentariosRepository } from "@/repositories/comments-repository";

interface ListComentarioByPostUseCaseRequest {
    postId: string
}

type ListComentarioByPostUseCaseResponse = {
    comentarios: ComentarioWithRelations[]
}

export class ListComentarioByPostUseCase {
    constructor (
        private comentariosRepository: ComentariosRepository,
        private postsRepository: PostsRepository
    ){}
    
    async execute ({postId}: ListComentarioByPostUseCaseRequest): Promise<ListComentarioByPostUseCaseResponse>{

        const post = await this.postsRepository.findBy({publicId: postId})
        if (!post){
            throw new ResourceNotFoundError()
        }

        
        const comentarios = await this.comentariosRepository.findComentariosByPost(post.id)

        if (comentarios.length === 0){
            throw new ResourceNotFoundError()
        }
        return {comentarios}
    }
}