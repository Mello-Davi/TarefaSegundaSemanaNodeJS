import type {
  LikesRepository,
  LikeWithRelations,
} from '@/repositories/likes-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetLikeUseCaseRequest {
  publicId: string
}

type GetLikeUseCaseResponse = {
  like: LikeWithRelations
}

export class GetLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({
    publicId,
  }: GetLikeUseCaseRequest): Promise<GetLikeUseCaseResponse> {
    const like = await this.likesRepository.findBy({ publicId })

    if (!like) {
      throw new ResourceNotFoundError()
    }
    return { like }
  }
}
