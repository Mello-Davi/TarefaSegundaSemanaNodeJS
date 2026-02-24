
import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository"
import { RegisterCommentUseCase } from "@/use-cases/comments/register-comments"
import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository"
import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository"


export function makeRegisterCommentUseCase(){
    const commentsRepository = new PrismaComentariosRepository()
    const usuariosRepository = new PrismaUsuariosReporistory()
    const postsRepository = new PrismaPostsRepository()
    
    const registerCommentUseCase = new RegisterCommentUseCase(commentsRepository, usuariosRepository, postsRepository)

    return registerCommentUseCase
}