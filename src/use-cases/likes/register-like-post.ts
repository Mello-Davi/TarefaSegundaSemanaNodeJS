import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { PostsRepository } from "@/repositories/posts-repository";
import type { LikesRepository } from "@/repositories/likes-repository";
import type { LikeWithRelations } from "@/repositories/likes-repository";
import { UserLikeAlreadyExistsError } from "../errors/like-already-existis-error";

interface RegisterLikePostUseCaseRequest {
    usuarioPublicId: string
    postId: string

}
  type RegisterLikePostUseCaseResponse = {
    like: LikeWithRelations
  }

export class RegisterLikePostUseCase {
    constructor (
        private likesRepository: LikesRepository, 
        private usuariosRepository: UsuariosRepository,
        private postsRepository: PostsRepository,
    ){}
    
    async execute ({
        usuarioPublicId,
        postId,
    }: RegisterLikePostUseCaseRequest): Promise<RegisterLikePostUseCaseResponse>{
        const user = await this.usuariosRepository.findBy({publicId: usuarioPublicId})
        if (!user){
            throw new ResourceNotFoundError
        }

        const post = await this.postsRepository.findBy({publicId: postId})
        if (!post){
            throw new ResourceNotFoundError
        }
        
        const likeExisting = await this.likesRepository.findByUserId(
            usuarioPublicId, 
            post.id,
            undefined
        )

        if(likeExisting){
            throw new UserLikeAlreadyExistsError()
        }

        const like = await this.likesRepository.create({
            usuarioId: user.id,
            postId: post.id,
        })
        return {like}
    }
}