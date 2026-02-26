import type { PostWithRelations, PostsRepository } from "@/repositories/posts-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ListPostByUserUseCaseRequest {
    usuarioId: string
}

type ListPostByUserUseCaseResponse = {
    posts: PostWithRelations[]
}

export class ListPostByUserUseCase {
    constructor (private postsRepository: PostsRepository){}
    
    async execute ({usuarioId}: ListPostByUserUseCaseRequest): Promise<ListPostByUserUseCaseResponse>{
        
        const posts = await this.postsRepository.findPostsByUser(usuarioId)

        if (posts.length === 0){
            throw new ResourceNotFoundError()
        }
        return {posts}
    }
}