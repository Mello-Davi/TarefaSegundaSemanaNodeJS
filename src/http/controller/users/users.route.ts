import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt.js'
import { verifyUserRole } from '../../middlewares/verify-user-role.js'
import { listComentariosByUser } from '../comments/list-comments-by-user.controller.js'
import { listLikesByUser } from '../likes/list-likes-by-user.controller.js'
import { listPostsByUser } from '../posts/list-posts-by-user.controller.js'
import { authenticate } from './authenticate.controller.js'
import { deleteUser } from './delete-user.controller.js'
import { forgotPassword } from './forgot-password.controller.js'
import { get, getProfile } from './get-user.controller.js'
import { list } from './list.controller.js'
import { register } from './register.controller.js'
import { resetPassword } from './reset-password.controller.js'
import { update, updateProfile } from './update-user.controller.js'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', register)
  app.post('/authenticate', authenticate)
  app.post('/forgot-password', forgotPassword)
  app.patch('/reset-password', resetPassword)

  app.get('/:publicId', get)
  app.get('/', list)
  app.delete(
    '/',
    { onRequest: [verifyJwt, verifyUserRole(['DEFAULT', 'ADMIN'])] },
    deleteUser,
  )
  app.patch('/:publicId', update)

  app.get('/:usuarioId/likes', listLikesByUser)
  app.get('/:usuarioId/posts', listPostsByUser)
  app.get('/:usuarioId/comments', listComentariosByUser)

  app.get('/me', { onRequest: [verifyJwt] }, getProfile)
  app.patch('/me', { onRequest: [verifyJwt] }, updateProfile)
}
