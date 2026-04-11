import { prisma } from '@/libs/prisma'

export class GetTopPostsLast24hUseCase {
  async execute() {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const posts = await prisma.post.findMany({
      where: {
        created_at: {
          gte: yesterday,
        },
      },
      include: {
        likes: true,
      },
    })

    const topPosts = posts
      .map((post) => ({
        title: post.titulo,
        likes: post.likes.length,
      }))
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5)

    return topPosts
  }
}