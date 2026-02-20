import type { Usuario } from "@/@types/prisma/client";
import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetUserUseCaseRequest {
    publicId: string
}

type GetUserUseCaseResponse = {
    user: Usuario
}

export class GetUserUseCase {
    constructor (private usuariosRepository: UsuariosRepository){}
    
    async execute ({
        publicId
    }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse>{
        
        const user = await this.usuariosRepository.findBy({publicId})

        if (!user){
            throw new ResourceNotFoundError()
        }
        return {user}
    }
}