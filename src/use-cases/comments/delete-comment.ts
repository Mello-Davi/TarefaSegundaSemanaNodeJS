
import type { ComentariosRepository } from "@/repositories/comments-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteCommentUseCaseRequest {
    publicId: string
}

export class DeleteCommentUseCase {
    constructor (private commentsRepository: ComentariosRepository){}
    
    async execute ({
        publicId
    }: DeleteCommentUseCaseRequest){
        
        const commentToDelete = await this.commentsRepository.findBy({publicId})
 
        if (!commentToDelete){
            throw new ResourceNotFoundError()
        }

        await this.commentsRepository.delete(commentToDelete.id)
    }
}