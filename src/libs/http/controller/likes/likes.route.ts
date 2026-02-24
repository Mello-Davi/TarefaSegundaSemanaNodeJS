import type { FastifyInstance } from "fastify";
import { registerLikePost } from "./register-like-post.controller";

export async function likesRoutes(app: FastifyInstance) {
    app.post('/', registerLikePost)
    app.post('/', registerLike)
}
