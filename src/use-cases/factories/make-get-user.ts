import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { GetUserUseCase } from "../users/get-users";

export function makeGetUseCase(){
    const usuariosRepository = new PrismaUsuariosReporistory()
    const getUserUseCase = new GetUserUseCase(usuariosRepository)

    return getUserUseCase
}