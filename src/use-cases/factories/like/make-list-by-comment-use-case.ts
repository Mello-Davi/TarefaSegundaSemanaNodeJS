import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository"
import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository"
import { ListLikeByComentarioUseCase } from "@/use-cases/likes/list-like-by-comments"


export function makeListLikeByComentarioUseCase(){
    const likesRepository = new PrismaLikesRepository()
    const comentariosRepository = new PrismaComentariosRepository()

    const listLikeByPostUseCase = new ListLikeByComentarioUseCase(likesRepository, comentariosRepository)

    return listLikeByPostUseCase
}