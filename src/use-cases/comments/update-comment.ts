import type { Comentario } from "@/@types/prisma/client";
import type { ComentariosRepository } from "@/repositories/comments-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { UsuariosRepository } from "@/repositories/users-repository";

interface UpdateCommentUseCaseRequest {
    publicId: string,
    usuarioId: string,
    conteudo?: string
}

type UpdateCommentUseCaseResponse = {
    comment: Comentario
}

export class UpdateCommentUseCase {
    constructor (private commentsRepository: ComentariosRepository,
        private usuariosRepository: UsuariosRepository
        
    ){}
    async execute ({
        publicId,
        usuarioId,
        conteudo
    }: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse>{
        
        const user = await this.usuariosRepository.findBy({publicId: usuarioId})
        if (!user){
            throw new ResourceNotFoundError
        }

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