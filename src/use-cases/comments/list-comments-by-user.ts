import type {
  ComentariosRepository,
  ComentarioWithRelations,
} from '@/repositories/comments-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListComentariosByUserUseCaseRequest {
  usuarioId: string
}

type ListComentariosByUserUseCaseResponse = {
  comentarios: ComentarioWithRelations[]
}

export class ListComentariosByUserUseCase {
  constructor(private comentariosRepository: ComentariosRepository) {}

  async execute({
    usuarioId,
  }: ListComentariosByUserUseCaseRequest): Promise<ListComentariosByUserUseCaseResponse> {
    const comentarios =
      await this.comentariosRepository.findComentariosByUser(usuarioId)

    if (comentarios.length === 0) {
      throw new ResourceNotFoundError()
    }
    return { comentarios }
  }
}
