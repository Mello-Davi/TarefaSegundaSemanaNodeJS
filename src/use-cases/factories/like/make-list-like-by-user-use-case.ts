import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository"
import { ListLikeByUserUseCase } from "@/use-cases/likes/list-like-by-user"


export function makeListLikeByUserUseCase(){
    const likesRepository = new PrismaLikesRepository()
    
    const listLikeByUserUseCase = new ListLikeByUserUseCase(likesRepository)

    return listLikeByUserUseCase
}