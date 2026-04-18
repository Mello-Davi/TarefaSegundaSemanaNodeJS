import { PrismaUsuariosReporistory } from '@/repositories/prisma/users-prisma-repository'
import { ListUserUseCase } from '../../users/list-users'
import { RedisProvider } from '@/providers/redis-provider'

export function makeListUseCase() {
  const usuariosRepository = new PrismaUsuariosReporistory()
  const cacheProvider = new RedisProvider()

  return new ListUserUseCase(usuariosRepository, cacheProvider)
}
