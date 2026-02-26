import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository"
import { ListPostUseCase } from "@/use-cases/posts/list-posts"
import { ListPostByUserUseCase } from "@/use-cases/posts/list-posts-by-user"


export function makeListPostByUserUseCase(){
    const postsRepository = new PrismaPostsRepository()
    
    const listPostByUserUseCase = new ListPostByUserUseCase(postsRepository)

    return listPostByUserUseCase
}