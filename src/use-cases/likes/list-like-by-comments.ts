import type { ComentariosRepository } from '@/repositories/comments-repository'
import type {
  LikesRepository,
  LikeWithRelations,
} from '@/repositories/likes-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListLikeByComentarioUseCaseRequest {
  comentarioId: string
}

type ListLikeByComentarioUseCaseResponse = {
  likes: LikeWithRelations[]
}

export class ListLikeByComentarioUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private comentariosRepository: ComentariosRepository,
  ) {}

  async execute({
    comentarioId,
  }: ListLikeByComentarioUseCaseRequest): Promise<ListLikeByComentarioUseCaseResponse> {
    const comentario = await this.comentariosRepository.findBy({
      publicId: comentarioId,
    })
    if (!comentario) {
      throw new ResourceNotFoundError()
    }

    const likes = await this.likesRepository.findLikesByComentario(
      comentario.id,
    )

    if (likes.length === 0) {
      throw new ResourceNotFoundError()
    }
    return { likes }
  }
}
