import { Prisma, type Post } from "@/@types/prisma/client"

export type PostWithRelations = Prisma.PostGetPayload<{
    include: {
      usuario: true
    }
  }>
export interface PostsRepository{
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    findBy(where: Prisma.PostWhereInput): Promise<Post | null>
    list(): Promise<Post[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.PostUpdateInput): Promise<Post>

    findPostsByUser(usuarioId: string): Promise<PostWithRelations[]>
}