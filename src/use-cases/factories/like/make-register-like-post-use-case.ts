import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository"
import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository"
import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository"
import { RegisterLikePostUseCase } from "@/use-cases/likes/register-like-post"


export function makeRegisterLikePostUseCase(){
    const likesRepository = new PrismaLikesRepository()
    const usuariosRepository = new PrismaUsuariosReporistory()
    const postsRepository = new PrismaPostsRepository()
    
    const registerLikeUseCase = new RegisterLikePostUseCase(likesRepository, usuariosRepository, postsRepository)

    return registerLikeUseCase
}