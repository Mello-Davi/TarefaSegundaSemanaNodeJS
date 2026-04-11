interface Post {
    title: string
    likes: number
  }
  
  interface PostsRepository {
    findManyRecent(date: Date): Promise<Post[]>
    findAllUsers(): Promise<{ email: string }[]>
  }
  
  interface MailProvider {
    sendMail(data: {
      to: string
      subject: string
      text: string
      html?: string
    }): Promise<void>
  }
  
  export class SendDailyHighlightUseCase {
    constructor(
      private postsRepository: PostsRepository,
      private mailProvider: MailProvider,
    ) {}
  
    async execute() {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
  
      const posts = await this.postsRepository.findManyRecent(yesterday)
  
      const topPosts = posts
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 5)
  
      if (!topPosts.length) return
  
      const content = topPosts
        .map((p) => `${p.title} - ${p.likes} curtidas`)
        .join('\n')
  
      const users = await this.postsRepository.findAllUsers()
  
      for (const user of users) {
        await this.mailProvider.sendMail({
          to: user.email,
          subject: 'Resumo diário',
          text: content,
        })
      }
    }
  }