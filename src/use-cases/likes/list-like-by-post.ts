import type {
  LikesRepository,
  LikeWithRelations,
} from '@/repositories/likes-repository'
import type { PostsRepository } from '@/repositories/posts-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListLikeByPostUseCaseRequest {
  postId: string
}

type ListLikeByPostUseCaseResponse = {
  likes: LikeWithRelations[]
}

export class ListLikeByPostUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({
    postId,
  }: ListLikeByPostUseCaseRequest): Promise<ListLikeByPostUseCaseResponse> {
    const post = await this.postsRepository.findBy({ publicId: postId })
    if (!post) {
      throw new ResourceNotFoundError()
    }

    const likes = await this.likesRepository.findLikesByPost(post.id)

    if (likes.length === 0) {
      throw new ResourceNotFoundError()
    }
    return { likes }
  }
}
