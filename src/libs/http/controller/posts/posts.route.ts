import type { FastifyInstance } from "fastify";
import { registerPost } from "./register-post.controller";
import { listPosts } from "./list-posts.controller";

export async function postsRoutes(app: FastifyInstance) {
    app.post('/', registerPost)
    app.get('/', listPosts)
}