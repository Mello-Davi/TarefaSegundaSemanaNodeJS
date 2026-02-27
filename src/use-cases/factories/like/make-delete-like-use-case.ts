import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository";
import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { DeleteLikeUseCase } from "@/use-cases/likes/delete-like";

export function makeDeleteLikeUseCase(){
    const likesRepository = new PrismaLikesRepository()
    const usuariosRepository = new PrismaUsuariosReporistory()
    const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository, usuariosRepository)

    return deleteLikeUseCase
}