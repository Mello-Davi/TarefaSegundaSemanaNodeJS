import type { FastifyInstance } from "fastify"
import { register } from "./register.controller.js"
import { get } from "./get-user.controller.js"
import { list } from "./list.controller.js"
import { deleteUser } from "./delete-user.controller.js"
import { update } from "./update-user.controller.js"
import { authenticate } from "./authenticate.controller.js"
import { listLikesByUser } from "../likes/list-likes-by-user.controller.js"
import { listPostsByUser } from "../posts/list-posts-by-user.controller.js"
import { listComentariosByUser } from "../comments/list-comments-by-user.controller.js"
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function usersRoutes (app: FastifyInstance){
    app.post('/', register)
    app.post('/authenticate', authenticate)

    app.get('/:publicId', get)
    app.get('/', list)
    app.delete('/',{onRequest: [verifyJwt, verifyUserRole(['DEFAULT', 'ADMIN'])]}, deleteUser)
    app.patch('/:publicId', update)

    app.get('/:usuarioId/likes', listLikesByUser)
    app.get('/:usuarioId/posts', listPostsByUser)
    app.get('/:usuarioId/comments', listComentariosByUser)
}