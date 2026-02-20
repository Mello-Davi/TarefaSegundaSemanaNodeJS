import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { ListUserUseCase } from "../users/list-users";

export function makeListUseCase(){
    const usuariosRepository = new PrismaUsuariosReporistory()
    const listUserUseCase = new ListUserUseCase(usuariosRepository)

    return listUserUseCase
}