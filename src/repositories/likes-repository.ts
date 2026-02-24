import { Prisma, type Like } from "@/@types/prisma/client"

export interface LikesRepository{
    create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
    findBy(where: Prisma.LikeWhereInput): Promise<Like | null>
    list(): Promise<Like[]>
    delete(id: number): Promise<void>
}