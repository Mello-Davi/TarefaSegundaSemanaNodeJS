import { Prisma, type Comentario } from "@/@types/prisma/client"

export type ComentarioWithRelations = Prisma.ComentarioGetPayload<{
    include: {
      usuario: true
      post: true
    }
  }>
export interface ComentariosRepository{
    create(data: Prisma.ComentarioUncheckedCreateInput): Promise<Comentario>
    findBy(where: Prisma.ComentarioWhereInput): Promise<Comentario | null>
    list(): Promise<Comentario[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.ComentarioUpdateInput): Promise<Comentario>

    findComentariosByUser(usuarioId: string): Promise<ComentarioWithRelations[]>
    findComentariosByPost(postId: number): Promise<ComentarioWithRelations[]>    
}