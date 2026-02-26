import { Prisma } from "@/@types/prisma/client"

export type LikeWithRelations = Prisma.LikeGetPayload<{
    include: {
      usuario: true
      post: true
      comentario: true
    }
  }>

export interface LikesRepository{
    create(data: Prisma.LikeUncheckedCreateInput): Promise<LikeWithRelations>
    findByUserId(usuarioId: string, postId?: number, comentarioId?: number): Promise<LikeWithRelations | null>
    findBy(where: Prisma.LikeWhereInput): Promise<LikeWithRelations | null>
    list(): Promise<LikeWithRelations[]>
    delete(id: number): Promise<void>

    findLikesByUser(usuarioId: string): Promise<LikeWithRelations[]>
    findLikesByPost(postId: number): Promise<LikeWithRelations[]>
    findLikesByComentario(comentarioId: number): Promise<LikeWithRelations[]>
}