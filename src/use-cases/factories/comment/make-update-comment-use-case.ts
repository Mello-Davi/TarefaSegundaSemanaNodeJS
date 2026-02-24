import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository";
import { UpdateCommentUseCase } from "@/use-cases/comments/update-comment";


export function makeUpdateCommentUseCase(){
    const commentsRepository = new PrismaComentariosRepository()
    const updateCommentsUseCase = new UpdateCommentUseCase(commentsRepository)

    return updateCommentsUseCase
}