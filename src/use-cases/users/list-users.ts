import type { Usuario } from "@/@types/prisma/client";
import type { UsuariosRepository } from "@/repositories/users-repository";

type ListUserUseCaseResponse = {
    users: Usuario[]
}

export class ListUserUseCase {
    constructor (private usuariosRepository: UsuariosRepository){}
    
    async execute (): Promise<ListUserUseCaseResponse>{
        const users = await this.usuariosRepository.list()

        return { users }
    }
}