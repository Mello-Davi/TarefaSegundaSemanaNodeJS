import { GetLikeUseCase } from "@/use-cases/likes/get-like";
import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository";

export function makeGetLikeUseCase(){
    const likesRepository = new PrismaLikesRepository()
    const getLikeUseCase = new GetLikeUseCase(likesRepository)

    return getLikeUseCase
}