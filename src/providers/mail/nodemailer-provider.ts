import nodemailer from 'nodemailer'

export class NodemailerProvider {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  async sendMail({
    to,
    subject,
    text,
    html,
  }: {
    to: string
    subject: string
    text: string
    html?: string
  }) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    })
  }
}
