import type { Post } from "@/@types/prisma/client"

type HTTPPost = {
    id: string
    conteudo: string
    createdAt: Date 
    uploadedAt: Date
}

export class PostPresenter {
    static toHTTP(post: Post): HTTPPost
    static toHTTP(posts: Post[]): HTTPPost[]
    static toHTTP(input: Post | Post[]): HTTPPost | HTTPPost[] {
        if(Array.isArray(input)){
            return input.map((post)=> this.toHTTP(post))
        }

        return{
            id: input.publicId,
            conteudo: input.conteudo,
            createdAt: input.created_at,
            uploadedAt: input.uploaded_at,
        }
    }
}