import { env } from 'node:process'
import { hash } from 'bcryptjs'
import type { Usuario } from '@/@types/prisma/client'
import type { UsuariosRepository } from '@/repositories/users-repository'

interface ResetPasswordUseCaseCaseRequest {
  token: string
  password: string
}

type ResetPasswordUseCaseCaseResponse = {
  user: Usuario
}

export class ResetPasswordUseCase {
  constructor(private readonly usersRepository: UsuariosRepository) {}

  async execute({
    token,
    password,
  }: ResetPasswordUseCaseCaseRequest): Promise<ResetPasswordUseCaseCaseResponse> {
    const saltRounds = Number(env.HASH_SALT_ROUNDS)
    const passwordHash = await hash(password, saltRounds)

    const userExists = await this.usersRepository.findBy({ token })

    if (
      !userExists?.tokenExpiresAt ||
      userExists.tokenExpiresAt < new Date()
    ) {
      throw new Error()
    }

    const user = await this.usersRepository.update(userExists.id, {
      passwordHash,
    })

    return { user }
  }
}
