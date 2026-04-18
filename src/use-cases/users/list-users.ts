import type { Usuario } from '@/@types/prisma/client'
import type { UsuariosRepository } from '@/repositories/users-repository'
import type { RedisProvider } from '@/providers/redis-provider'

type ListUserUseCaseResponse = {
  users: Usuario[]
}

export class ListUserUseCase {
  constructor(
    private usuariosRepository: UsuariosRepository,
    private cacheProvider: RedisProvider,
  ) {}

  async execute(): Promise<ListUserUseCaseResponse> {
    const cacheKey = 'users:all'
    const start = Date.now()

    const cached = await this.cacheProvider.get(cacheKey)

    if (cached) {
      console.log('Cache Hit')
      console.log('Tempo:', Date.now() - start, 'ms')

      return { users: JSON.parse(cached) }
    }
    console.log('Cache Miss')

    const users = await this.usuariosRepository.list()
    await this.cacheProvider.set(cacheKey, JSON.stringify(users), 60)

    return { users }
  }
}
