import { AuthenticateUsuarioUseCase } from '@/use-cases/users/authenticate'
import { describe, it, vi, expect } from 'vitest'

describe('Autenticacao do Use Case De Usuario', () => {
  it('deve retornar um token quando o email e a senha estiverem corretos', async () => {

    //arrange
    const usuariosRepository = {
      findByEmail: vi.fn().mockResolvedValue({
        id: '1',
        nome: 'Davi',
        email: 'davi@email.com',
        passwordHash: 'hash-fake' 
      })
    }

    const hashProvider = {
      compare: vi.fn().mockResolvedValue(true)
    }

    const tokenProvider = {
      sign: vi.fn().mockReturnValue('token-falso-123')
    }

    //injeção de dependencias
    const useCase = new AuthenticateUsuarioUseCase(
      usuariosRepository as any,
      hashProvider as any,
      tokenProvider as any
    )

    //act
    const result = await useCase.execute({
      email: 'davi@email.com',
      password: '123456'
    })

    //assert

    expect(result.token).toBe('token-falso-123')

    expect(usuariosRepository.findByEmail)
      .toHaveBeenCalledWith('davi@email.com')

    expect(hashProvider.compare)
      .toHaveBeenCalledWith('123456', 'hash-fake')
  })
});