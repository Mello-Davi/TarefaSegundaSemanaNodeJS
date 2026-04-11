import { app } from './app.js'
import { env } from './env/index.js'
import cron from 'node-cron'
import { PrismaPostsRepository } from './repositories/prisma/posts-prisma-repository.js'
import { NodemailerProvider } from './providers/mail/nodemailer-provider.js'
import { SendDailyHighlightUseCase } from './use-cases/messaging/send-daily-highlight-use-case.js'

app.listen({
  host: env.HOST,
  port: env.PORT,
}).then(() => {
  console.log(`Servidor rodando em http://localhost:${env.PORT}`)
})

cron.schedule(process.env.CRON_SCHEDULE || '* * * * *', async () => {
  console.log('Running Job...')

  try {
    const postsRepository = new PrismaPostsRepository()
    const mailProvider = new NodemailerProvider()

    const useCase = new SendDailyHighlightUseCase(
      postsRepository,
      mailProvider,
    )

    await useCase.execute()

    console.log('Emails enviados!')
  } catch (err) {
    console.error('Erro no CRON:', err)
  }
})