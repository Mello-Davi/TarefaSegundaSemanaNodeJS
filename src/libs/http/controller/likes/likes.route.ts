import type { FastifyInstance } from "fastify";
import { getLike } from "./get-like.controller";

export async function likesRoutes(app: FastifyInstance) {
    app.get('/:publicId', getLike)
}
