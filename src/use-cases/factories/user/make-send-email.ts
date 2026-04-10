import { SendEmailUseCase } from '@/use-cases/messaging/register-email'

export function makeSendEmailUseCase() {
  return new SendEmailUseCase()
}
