import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { LikeWithRelations, LikesRepository } from "@/repositories/likes-repository";

interface ListLikeByUserUseCaseRequest {
    usuarioId: string
}

type ListLikeByUserUseCaseResponse = {
    likes: LikeWithRelations[]
}

export class ListLikeByUserUseCase {
    constructor (private likesRepository: LikesRepository){}
    
    async execute ({usuarioId}: ListLikeByUserUseCaseRequest): Promise<ListLikeByUserUseCaseResponse>{
        
        const likes = await this.likesRepository.findLikesByUser(usuarioId)

        if (likes.length === 0){
            throw new ResourceNotFoundError()
        }
        return {likes}
    }
}