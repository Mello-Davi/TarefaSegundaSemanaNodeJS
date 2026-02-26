import type { FastifyInstance } from "fastify";
import { registerComment } from "./register-comment.controller";
import { listComments } from "./list-comment.controller";
import { getComment } from "./get-comment.controller";
import { updateComment } from "./update-comment.controller";
import { deleteComment } from "./delete-comment.controller";
import { registerLikeComment } from "../likes/register-like-comment.controller";
import { listLikesByComentario } from "../likes/list-like-by-comment.controller";


export async function commentsRoutes(app: FastifyInstance) {
    app.post('/', registerComment)
    app.get('/', listComments)
    app.get('/:publicId', getComment)
    app.patch('/:publicId', updateComment)
    app.delete('/:publicId', deleteComment)

    app.post('/:comentarioId/likes', registerLikeComment)
    app.get('/:comentarioId/likes', listLikesByComentario)
}
