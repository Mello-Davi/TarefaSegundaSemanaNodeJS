import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteUserUseCaseRequest {
    publicId: string
}

export class DeleteUserUseCase {
    constructor (private usuariosRepository: UsuariosRepository){}
    
    async execute ({
        publicId
    }: DeleteUserUseCaseRequest){
        
        const user = await this.usuariosRepository.findBy({publicId})
 
        if (!user){
            throw new ResourceNotFoundError()
        }

        await this.usuariosRepository.delete(user.id)
    }
}