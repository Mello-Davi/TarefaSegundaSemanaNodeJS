import type { Post } from "@/@types/prisma/client";
import type { PostsRepository } from "@/repositories/posts-repository";
import type { UsuariosRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface RegisterPostUseCaseRequest {
    titulo: string
    conteudo: string
    usuarioPublicId: string
}

type RegisterPostUseCaseResponse = {
    post: Post
}

export class RegisterPostUseCase {
    constructor (private postsRepository: PostsRepository, 
        private usuariosRepository: UsuariosRepository
    ){}
    
    async execute ({
        titulo,
        conteudo,
        usuarioPublicId
    }: RegisterPostUseCaseRequest): Promise<RegisterPostUseCaseResponse>{
    
        const user = await this.usuariosRepository.findBy({publicId: usuarioPublicId})
        if (!user){
            throw new ResourceNotFoundError
        }
        const post = await this.postsRepository.create({
            titulo,
            conteudo,
            usuarioId: user.id
        })
        return {post}
    }
}