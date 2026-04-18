import Redis from 'ioredis'
import { env } from 'node:process'

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  password: env.REDIS_PASSWORD,
})
