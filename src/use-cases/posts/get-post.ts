
import type { PostsRepository } from "@/repositories/posts-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { Post } from "@/@types/prisma/client";

interface GetPostUseCaseRequest {
    publicId: string
}

type GetPostUseCaseResponse = {
    post: Post
}

export class GetPostUseCase {
    constructor (private postsRepository: PostsRepository){}
    
    async execute ({
        publicId
    }: GetPostUseCaseRequest): Promise<GetPostUseCaseResponse>{
        
        const post = await this.postsRepository.findBy({publicId})

        if (!post){
            throw new ResourceNotFoundError()
        }
        return {post}
    }
}