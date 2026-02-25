import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository"
import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository"
import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository"
import { RegisterLikeCommentUseCase } from "@/use-cases/likes/register-like-comment"


export function makeRegisterLikeCommentUseCase(){
    const likesRepository = new PrismaLikesRepository()
    const usuariosRepository = new PrismaUsuariosReporistory()
    const comentariosRepository = new PrismaComentariosRepository()
    
    const registerLikeUseCase = new RegisterLikeCommentUseCase(likesRepository, usuariosRepository, comentariosRepository)

    return registerLikeUseCase
}