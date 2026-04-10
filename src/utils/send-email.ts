import { env } from 'node:process'
import type { SentMessageInfo } from 'nodemailer'
import nodemailer from 'nodemailer'
import type { Attachment } from 'nodemailer/lib/mailer'
import { logger } from '@/libs/logger'

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE === 'true',
  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  },
} as nodemailer.TransportOptions)

interface SendEmailRequest {
  to: string
  subject: string
  message: string
  html: string
  attachments?: Attachment[]
}

export async function sendEmail({
  to,
  subject,
  message,
  html,
  attachments,
}: SendEmailRequest): Promise<SentMessageInfo> {
  try {
    await transporter.verify()
    console.log('SMTP OK')

    const info = await transporter.sendMail({
      from: env.SMTP_EMAIL,
      to,
      subject,
      text: message,
      html,
      ...(attachments ? { attachments } : {}),
    })

    logger.info({ sentTo: to, messageId: info.messageId }, 'E-mail enviado!')

    return info
  } catch (error) {
    logger.error({ error }, 'Erro ao enviar e-mail')

    throw error
  }
}
