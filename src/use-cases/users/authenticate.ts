import { compare } from 'bcryptjs'
import type { Usuario } from '@/@types/prisma/client'
import type { UsuariosRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUsuarioUseCaseRequest {
  email: string
  password: string
}
interface HashProvider {
  compare(password: string, hash: string): Promise<boolean>
}

interface TokenProvider {
  sign(payload: any): string
}

type AuthenticateUsuarioUseCaseResponse = {
  user: Usuario,
  token: string
}

export class AuthenticateUsuarioUseCase {
  constructor(private usuariosRepository: UsuariosRepository,
    private hashProvider: HashProvider,
    private tokenProvider: TokenProvider
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUsuarioUseCaseRequest): Promise<AuthenticateUsuarioUseCaseResponse> {
    const user = await this.usuariosRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await this.hashProvider.compare(password, user.passwordHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const token = this.tokenProvider.sign({
      sub: user.id
    })

    return { user, token }
  }
}
