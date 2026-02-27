import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository";
import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { UpdateCommentUseCase } from "@/use-cases/comments/update-comment";


export function makeUpdateCommentUseCase(){
    const commentsRepository = new PrismaComentariosRepository()
    const usuariosRepository = new PrismaUsuariosReporistory()
    const updateCommentsUseCase = new UpdateCommentUseCase(commentsRepository, usuariosRepository)

    return updateCommentsUseCase
}