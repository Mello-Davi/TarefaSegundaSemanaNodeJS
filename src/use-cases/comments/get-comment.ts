import type { ComentariosRepository } from "@/repositories/comments-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { Comentario } from "@/@types/prisma/client";

interface GetCommentUseCaseRequest {
    publicId: string
}

type GetCommentUseCaseResponse = {
    comment: Comentario
}

export class GetCommentUseCase {
    constructor (private commentsRepository: ComentariosRepository){}
    
    async execute ({
        publicId
    }: GetCommentUseCaseRequest): Promise<GetCommentUseCaseResponse>{
        
        const comment = await this.commentsRepository.findBy({publicId})

        if (!comment){
            throw new ResourceNotFoundError()
        }
        return {comment}
    }
}