import { Prisma, type Comentario } from "@/@types/prisma/client"

export interface ComentariosRepository{
    create(data: Prisma.ComentarioUncheckedCreateInput): Promise<Comentario>
    findBy(where: Prisma.ComentarioWhereInput): Promise<Comentario | null>
    list(): Promise<Comentario[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.ComentarioUpdateInput): Promise<Comentario>
}