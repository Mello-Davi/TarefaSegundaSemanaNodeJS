import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { LikeWithRelations, LikesRepository } from "@/repositories/likes-repository";
import type { ComentariosRepository } from "@/repositories/comments-repository";
import { UserLikeAlreadyExistsError } from "../errors/like-already-existis-error";

interface RegisterLikeCommentUseCaseRequest {
    usuarioId: string
    comentarioId: string

}

type RegisterLikeCommentUseCaseResponse = {
    like: LikeWithRelations
}

export class RegisterLikeCommentUseCase {
    constructor (
        private likesRepository: LikesRepository, 
        private usuariosRepository: UsuariosRepository,
        private comentariosRepository: ComentariosRepository
    ){}
    
    async execute ({
        usuarioId,
        comentarioId,
    }: RegisterLikeCommentUseCaseRequest): Promise<RegisterLikeCommentUseCaseResponse>{

        const user = await this.usuariosRepository.findBy({publicId: usuarioId})
        if (!user){
            throw new ResourceNotFoundError()
        }

        const comentario = await this.comentariosRepository.findBy({publicId: comentarioId})
        if (!comentario){
            throw new ResourceNotFoundError()
        }

        const likeExisting = await this.likesRepository.findByUserId(
            usuarioId,
            undefined,
            comentario.id
        )
    
        if(likeExisting){
            throw new UserLikeAlreadyExistsError()
        }
    
        const like = await this.likesRepository.create({
            usuarioId: user.id,
            comentarioId: comentario.id,
        })
        return {like}
    }
}