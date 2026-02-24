import type { Like } from "@/@types/prisma/client"

type HTTPLike = {
    id: string
    createdAt: Date 
}

export class LikePresenter {
    static toHTTP(like: Like): HTTPLike
    static toHTTP(likes: Like[]): HTTPLike[]
    static toHTTP(input: Like | Like[]): HTTPLike | HTTPLike[] {
        if(Array.isArray(input)){
            return input.map((Like)=> this.toHTTP(Like))
        }

        return{
            id: input.publicId,
            createdAt: input.created_at
        }
    }
}