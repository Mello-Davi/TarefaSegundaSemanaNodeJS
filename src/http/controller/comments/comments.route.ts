import type { FastifyInstance } from "fastify";
import { registerComment } from "./register-comment.controller";
import { listComments } from "./list-comment.controller";
import { getComment } from "./get-comment.controller";
import { updateComment } from "./update-comment.controller";
import { deleteComment } from "./delete-comment.controller";
import { registerLikeComment } from "../likes/register-like-comment.controller";
import { listLikesByComentario } from "../likes/list-like-by-comment.controller";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function commentsRoutes(app: FastifyInstance) {
    app.post('/',{onRequest: [verifyJwt, verifyUserRole(['DEFAULT'])]}, registerComment) 
    app.get('/', listComments)
    app.get('/:publicId', getComment)
    app.patch('/:publicId',{onRequest: [verifyJwt, verifyUserRole(['DEFAULT'])]}, updateComment)
    app.delete('/:publicId',{onRequest: [verifyJwt, verifyUserRole(['DEFAULT','ADMIN'])]}, deleteComment)

    app.post('/:comentarioId/likes',{onRequest: [verifyJwt, verifyUserRole(['DEFAULT'])]}, registerLikeComment)
    app.get('/:comentarioId/likes', listLikesByComentario)
}
