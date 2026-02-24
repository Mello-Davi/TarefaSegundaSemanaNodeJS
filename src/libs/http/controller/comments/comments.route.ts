import type { FastifyInstance } from "fastify";
import { registerComment } from "./register-comment.controller";


export async function commentsRoutes(app: FastifyInstance) {
    app.post('/', registerComment)
}
