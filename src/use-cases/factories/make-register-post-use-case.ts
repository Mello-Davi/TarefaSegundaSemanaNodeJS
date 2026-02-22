import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository"
import { RegisterPostUseCase } from "../posts/register"
import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository"


export function makeRegisterPostUseCase(){
    const postsRepository = new PrismaPostsRepository()
    const usuariosRepository = new PrismaUsuariosReporistory()
    
    const registerPostUseCase = new RegisterPostUseCase(postsRepository, usuariosRepository)

    return registerPostUseCase
}