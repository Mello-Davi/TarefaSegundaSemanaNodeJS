import type { FastifyInstance } from 'fastify'
import { commentsRoutes } from './comments/comments.route.js'
import { likesRoutes } from './likes/likes.route.js'
import { postsRoutes } from './posts/posts.route.js'
import { usersRoutes } from './users/users.route.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(postsRoutes, { prefix: '/posts' })
  app.register(commentsRoutes, { prefix: '/comments' })
  app.register(likesRoutes, { prefix: '/likes' })
}
