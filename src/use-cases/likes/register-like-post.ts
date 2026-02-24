import type { Like } from "@/@types/prisma/client";
import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { PostsRepository } from "@/repositories/posts-repository";
import type { LikesRepository } from "@/repositories/likes-repository";

interface RegisterLikeUseCaseRequest {
    usuarioId: string
    postId: string

}

type RegisterLikeUseCaseResponse = {
    like: Like
}

export class RegisterLikeUseCase {
    constructor (
        private likesRepository: LikesRepository, 
        private usuariosRepository: UsuariosRepository,
        private postsRepository: PostsRepository,
    ){}
    
    async execute ({
        usuarioId,
        postId,
    }: RegisterLikeUseCaseRequest): Promise<RegisterLikeUseCaseResponse>{
    
        const user = await this.usuariosRepository.findBy({publicId: usuarioId})
        if (!user){
            throw new ResourceNotFoundError
        }
        const post = await this.postsRepository.findBy({publicId: postId})
        if (!post){
            throw new ResourceNotFoundError
        }
        
        const like = await this.likesRepository.create({
            usuarioId: user.id,
            postId: post.id,
        })
        return {like}
    }
}