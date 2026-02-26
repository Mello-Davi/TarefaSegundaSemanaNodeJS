import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository"
import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository"
import { ListComentarioByPostUseCase } from "@/use-cases/comments/list-comments-by-post"


export function makeListComentarioByPostUseCase(){
    const comentariosRepository = new PrismaComentariosRepository()
    const postsRepository = new PrismaPostsRepository()

    const listLikeByPostUseCase = new ListComentarioByPostUseCase(comentariosRepository, postsRepository)

    return listLikeByPostUseCase
}