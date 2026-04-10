import { PrismaUsuariosReporistory } from '@/repositories/prisma/users-prisma-repository'
import { ResetPasswordUseCase } from '@/use-cases/users/reset-senha'

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsuariosReporistory()
  const forgotPasswordUseCase = new ResetPasswordUseCase(usersRepository)

  return forgotPasswordUseCase
}
