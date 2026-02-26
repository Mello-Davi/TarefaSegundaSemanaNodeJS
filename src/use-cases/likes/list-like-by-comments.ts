import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { LikeWithRelations, LikesRepository } from "@/repositories/likes-repository";
import type { ComentariosRepository } from "@/repositories/comments-repository";

interface ListLikeByComentarioUseCaseRequest {
    comentarioId: string
}

type ListLikeByComentarioUseCaseResponse = {
    likes: LikeWithRelations[]
}

export class ListLikeByComentarioUseCase {
    constructor (
        private likesRepository: LikesRepository,
        private comentariosRepository: ComentariosRepository
    ){}
    
    async execute ({comentarioId}: ListLikeByComentarioUseCaseRequest): Promise<ListLikeByComentarioUseCaseResponse>{

        const comentario = await this.comentariosRepository.findBy({publicId: comentarioId})
        if (!comentario){
            throw new ResourceNotFoundError()
        }

        
        const likes = await this.likesRepository.findLikesByComentario(comentario.id)

        if (likes.length === 0){
            throw new ResourceNotFoundError()
        }
        return {likes}
    }
}