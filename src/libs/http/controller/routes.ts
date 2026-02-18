import type { FastifyInstance } from "fastify"
import { usersRoutes } from "./users/users.route.js"

export async function appRoutes(app:FastifyInstance) {
    app.register(usersRoutes, { prefix:'/users'})
}