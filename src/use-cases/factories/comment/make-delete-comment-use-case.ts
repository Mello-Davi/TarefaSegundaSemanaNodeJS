import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository";
import { DeleteCommentUseCase } from "@/use-cases/comments/delete-comment";

export function makeDeleteCommentUseCase(){
    const commentsRepository = new PrismaComentariosRepository()
    const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository)

    return deleteCommentUseCase
}