import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository'
import { PrismaUsuariosReporistory } from '@/repositories/prisma/users-prisma-repository'
import { RegisterPostUseCase } from '../../posts/register'

export function makeRegisterPostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const usuariosRepository = new PrismaUsuariosReporistory()

  const registerPostUseCase = new RegisterPostUseCase(
    postsRepository,
    usuariosRepository,
  )

  return registerPostUseCase
}
