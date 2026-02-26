import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository"
import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository"
import { ListLikeByPostUseCase } from "@/use-cases/likes/list-like-by-post"


export function makeListLikeByPostUseCase(){
    const likesRepository = new PrismaLikesRepository()
    const postsRepository = new PrismaPostsRepository()

    const listLikeByPostUseCase = new ListLikeByPostUseCase(likesRepository, postsRepository)

    return listLikeByPostUseCase
}