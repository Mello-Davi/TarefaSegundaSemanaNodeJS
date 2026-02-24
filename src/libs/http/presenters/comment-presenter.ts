import type { Comentario } from "@/@types/prisma/client"

type HTTPComentario = {
    id: string
    conteudo: string
    createdAt: Date 
}

export class ComentarioPresenter {
    static toHTTP(comentario: Comentario): HTTPComentario
    static toHTTP(comentarios: Comentario[]): HTTPComentario[]
    static toHTTP(input: Comentario | Comentario[]): HTTPComentario | HTTPComentario[] {
        if(Array.isArray(input)){
            return input.map((comentario)=> this.toHTTP(comentario))
        }

        return{
            id: input.publicId,
            conteudo: input.conteudo,
            createdAt: input.created_at
        }
    }
}