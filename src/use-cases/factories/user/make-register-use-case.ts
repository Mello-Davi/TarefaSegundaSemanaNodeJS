import { PrismaUsuariosReporistory } from "@/repositories/prisma/users-prisma-repository";
import { RegisterUserUseCase } from "../../users/register";

export function makeRegisterUserUseCase(){
    const usuariosRepository = new PrismaUsuariosReporistory()
    const registerUserUseCase = new RegisterUserUseCase(usuariosRepository)

    return registerUserUseCase
}