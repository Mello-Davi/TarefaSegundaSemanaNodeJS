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
    findBy(where: Prisma.LikeWhereInput): Promise<LikeWithRelations | null>
    list(): Promise<LikeWithRelations[]>
    delete(id: number): Promise<void>
}