import type { Usuario } from "@/@types/prisma/client"

type HTTPUser = {
    id: string
    nome: string,
    email: string
    foto?: string | null
    createdAt: Date 
    uploadedAt: Date
}

export class UserPresenter {
    static toHTTP(user: Usuario): HTTPUser
    static toHTTP(users: Usuario[]): HTTPUser[]
    static toHTTP(input: Usuario | Usuario[]): HTTPUser | HTTPUser[] {
        if(Array.isArray(input)){
            return input.map((user)=> this.toHTTP(user))
        }

        return{
            id: input.publicId,
            nome: input.nome,
            email: input.email,
            foto: input.foto,
            createdAt: input.created_at,
            uploadedAt: input.uploaded_at,
        }
    }
}