import type { Comentario } from "@/@types/prisma/client";
import type { ComentariosRepository } from "@/repositories/comments-repository";

type ListCommentsUseCaseResponse = {
    comments: Comentario[]
}

export class ListCommentsUseCase {
    constructor (private commentsRepository: ComentariosRepository){}
    
    async execute (): Promise<ListCommentsUseCaseResponse>{
        const comments = await this.commentsRepository.list()

        return { comments }
    }
}