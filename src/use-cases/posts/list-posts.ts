import type { Post } from "@/@types/prisma/client";
import type { PostsRepository } from "@/repositories/posts-repository";

type ListPostUseCaseResponse = {
    posts: Post[]
}

export class ListPostUseCase {
    constructor (private postsRepository: PostsRepository){}
    
    async execute (): Promise<ListPostUseCaseResponse>{
        const posts = await this.postsRepository.list()

        return { posts }
    }
}