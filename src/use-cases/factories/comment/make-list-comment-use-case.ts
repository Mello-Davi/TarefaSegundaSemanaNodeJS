import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository";
import { ListCommentsUseCase } from "@/use-cases/comments/list-comments";

export function makeListCommentUseCase(){
    const CommentsRepository = new PrismaComentariosRepository()
    const listCommentUseCase = new ListCommentsUseCase(CommentsRepository)

    return listCommentUseCase
}