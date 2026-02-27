import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { LikesRepository } from "@/repositories/likes-repository";

interface DeleteLikeUseCaseRequest {
    usuarioPublicId: string
    publicId: string
}

export class DeleteLikeUseCase {
    constructor (
        private likesRepository: LikesRepository,
        private usuariosRepository : UsuariosRepository
    ){}
    
    async execute ({
        usuarioPublicId,
        publicId
    }: DeleteLikeUseCaseRequest){
        
        const user = await this.usuariosRepository.findBy({publicId: usuarioPublicId})
        if (!user){
            throw new ResourceNotFoundError()
        }
        const likeToDelete = await this.likesRepository.findBy({publicId})
 
        if (!likeToDelete){
            throw new ResourceNotFoundError()
        }

        await this.likesRepository.delete(likeToDelete.id)
    }
}