import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository";
import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { DeleteCommentUseCase } from "@/use-cases/comments/delete-comment";

export function makeDeleteCommentUseCase(){
    const commentsRepository = new PrismaComentariosRepository()
    const usuariosRepository = new PrismaUsuariosReporistory()
    
    const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository, usuariosRepository)

    return deleteCommentUseCase
}