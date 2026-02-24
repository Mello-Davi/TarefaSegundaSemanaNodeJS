import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository";
import { GetCommentUseCase } from "@/use-cases/comments/get-comment";

export function makeGetCommentUseCase(){
    const CommentsRepository = new PrismaComentariosRepository()
    const getCommentUseCase = new GetCommentUseCase(CommentsRepository)

    return getCommentUseCase
}