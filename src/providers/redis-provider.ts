import { redis } from '@/libs/redis'

//criacao de uma classe que encapsula o redis
export class RedisProvider {
  async get(key: string): Promise<string | null> {
    return redis.get(key)
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await redis.set(key, value, 'EX', ttl)
  }
}
