import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { verifyUserRole } from '../../middlewares/verify-user-role'
import { deleteLike } from './delete-like.controller'
import { getLike } from './get-like.controller'

export async function likesRoutes(app: FastifyInstance) {
  app.get('/:publicId', getLike)
  app.delete(
    '/:publicId',
    { onRequest: [verifyJwt, verifyUserRole(['DEFAULT'])] },
    deleteLike,
  )
}
