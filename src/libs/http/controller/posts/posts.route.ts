import type { FastifyInstance } from "fastify";
import { registerPost } from "./register-post.controller";

export async function postsRoutes(app: FastifyInstance) {
    app.post('/', registerPost)
}