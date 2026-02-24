import type { FastifyInstance } from "fastify"
import { usersRoutes } from "./users/users.route.js"
import { postsRoutes } from "./posts/posts.route.js"
import { commentsRoutes } from "./comments/comments.route.js"
import { likesRoutes } from "./likes/likes.route.js"

export async function appRoutes(app:FastifyInstance) {
    app.register(usersRoutes, { prefix:'/users'})
    app.register(postsRoutes, { prefix:'/posts'})
    app.register(commentsRoutes, {prefix:'/comments'})
    app.register(likesRoutes, {prefix: '/likes'})
}