import type { FastifyInstance } from "fastify";
import { registerComment } from "./register-comment.controller";
import { listComments } from "./list-comment.controller";
import { getComment } from "./get-comment.controller";


export async function commentsRoutes(app: FastifyInstance) {
    app.post('/', registerComment)
    app.get('/', listComments)
    app.get('/:publicId', getComment)
}
