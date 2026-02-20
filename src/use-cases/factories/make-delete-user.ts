import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { DeleteUserUseCase } from "../users/delete-user";

export function makeDeleteUserUseCase(){
    const usuariosRepository = new PrismaUsuariosReporistory()
    const deleteUserUseCase = new DeleteUserUseCase(usuariosRepository)

    return deleteUserUseCase
}