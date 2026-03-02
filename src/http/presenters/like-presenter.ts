import type { Prisma } from "@/@types/prisma/client"

type LikeWithRelations = Prisma.LikeGetPayload<{
    include: {
      usuario: true
      post: true
      comentario: true
    }
  }>

type HTTPLike = {
  id: string
  usuarioId: string
  createdAt: Date
  postId?: string
  comentarioId?: string
}

export class LikePresenter {
  static toHTTP(like: LikeWithRelations): HTTPLike
  static toHTTP(likes: LikeWithRelations[]): HTTPLike[]
  static toHTTP(input: LikeWithRelations | LikeWithRelations[]): HTTPLike | HTTPLike[] {
    if (Array.isArray(input)) {
      return input.map((like) => this.toHTTP(like))
    }

    return {
      id: input.publicId,
      usuarioId: input.usuario.publicId,
      createdAt: input.created_at,
      postId: input.post?.publicId,
      comentarioId: input.comentario?.publicId,
    }
  }
}