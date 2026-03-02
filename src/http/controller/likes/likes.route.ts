import type { FastifyInstance } from "fastify";
import { getLike } from "./get-like.controller";
import { deleteLike } from "./delete-like.controller";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function likesRoutes(app: FastifyInstance) {
    app.get('/:publicId', getLike)
    app.delete('/:publicId',{onRequest: [verifyJwt, verifyUserRole(['DEFAULT'])]}, deleteLike)
}
