import type { Comentario } from "@/@types/prisma/client";
import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { PostsRepository } from "@/repositories/posts-repository";
import type { ComentariosRepository } from "@/repositories/comments-repository";

interface RegisterCommentUseCaseRequest {
    conteudo: string
    usuarioId: string
    postId: string
}

type RegisterCommentUseCaseResponse = {
    comment: Comentario
}

export class RegisterCommentUseCase {
    constructor (private commentsRepository: ComentariosRepository, 
        private usuariosRepository: UsuariosRepository,
        private postsRepository: PostsRepository
    ){}
    
    async execute ({
        conteudo,
        usuarioId,
        postId
    }: RegisterCommentUseCaseRequest): Promise<RegisterCommentUseCaseResponse>{
    
        const user = await this.usuariosRepository.findBy({publicId: usuarioId})
        if (!user){
            throw new ResourceNotFoundError
        }
        const post = await this.postsRepository.findBy({publicId: postId})
        if (!post){
            throw new ResourceNotFoundError
        }


        const comment = await this.commentsRepository.create({
            conteudo,
            usuarioId: user.id,
            postId: post.id
        })
        return {comment}
    }
}