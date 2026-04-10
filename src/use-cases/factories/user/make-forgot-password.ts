import { PrismaUsuariosReporistory } from '@/repositories/prisma/users-prisma-repository'
import { ForgotPasswordUseCase } from '@/use-cases/users/esqueceu-senha'

export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUsuariosReporistory()
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

  return forgotPasswordUseCase
}
