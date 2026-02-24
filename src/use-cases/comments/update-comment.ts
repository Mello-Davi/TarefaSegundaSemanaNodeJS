import type { Comentario } from "@/@types/prisma/client";
import type { ComentariosRepository } from "@/repositories/comments-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateCommentUseCaseRequest {
    publicId: string,
    conteudo?: string
}

type UpdateCommentUseCaseResponse = {
    comment: Comentario
}

export class UpdateCommentUseCase {
    constructor (private commentsRepository: ComentariosRepository){}
    async execute ({
        publicId,
        conteudo
    }: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse>{
        
        const commentToUpdate = await this.commentsRepository.findBy({publicId})

        if (!commentToUpdate){
            throw new ResourceNotFoundError()
        }

        const comment = await this.commentsRepository.update(commentToUpdate.id, {
            conteudo
        })

        return {comment}
    }
}