
import type { ComentariosRepository } from "@/repositories/comments-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { UsuariosRepository } from "@/repositories/users-repository";

interface DeleteCommentUseCaseRequest {
    publicId: string
    usuarioId: string
}

export class DeleteCommentUseCase {
    constructor (private commentsRepository: ComentariosRepository,
        private usuariosRepository: UsuariosRepository
    ){}
    
    async execute ({
        publicId,
        usuarioId
    }: DeleteCommentUseCaseRequest){
        
        const user = await this.usuariosRepository.findBy({publicId: usuarioId})
        if (!user){
            throw new ResourceNotFoundError
        }

        const commentToDelete = await this.commentsRepository.findBy({publicId})
        
        if (!commentToDelete){
            throw new ResourceNotFoundError()
        }

        await this.commentsRepository.delete(commentToDelete.id)
    }
}