import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { verifyUserRole } from '../../middlewares/verify-user-role'
import { listComentariosByPost } from '../comments/list-comments-by-post.controller'
import { listLikesByPost } from '../likes/list-likes-by-post.controller'
import { registerLikePost } from '../likes/register-like-post.controller'
import { deletePost } from './delete-post.controller'
import { getPost } from './get-post.controller'
import { listPosts } from './list-posts.controller'
import { registerPost } from './register-post.controller'
import { updatePost } from './update-post.controller'

export async function postsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { onRequest: [verifyJwt, verifyUserRole(['DEFAULT'])] },
    registerPost,
  )
  app.get('/', listPosts)
  app.get('/:publicId', getPost)
  app.patch('/:publicId', updatePost)
  app.delete(
    '/:publicId',
    { onRequest: [verifyJwt, verifyUserRole(['DEFAULT', 'ADMIN'])] },
    deletePost,
  )

  app.post(
    '/:postId/likes',
    { onRequest: [verifyJwt, verifyUserRole(['DEFAULT'])] },
    registerLikePost,
  )

  app.get('/:postId/likes', listLikesByPost)
  app.get('/:postId/comments', listComentariosByPost)
}
