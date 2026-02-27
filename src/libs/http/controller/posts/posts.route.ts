import type { FastifyInstance } from "fastify";
import { registerPost } from "./register-post.controller";
import { listPosts } from "./list-posts.controller";
import { getPost } from "./get-post.controller";
import { updatePost } from "./update-post.controller";
import { deletePost } from "./delete-post.controller";
import { registerLikePost } from "../likes/register-like-post.controller";
import { listLikesByPost } from "../likes/list-likes-by-post.controller";
import { listComentariosByPost } from "../comments/list-comments-by-post.controller";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function postsRoutes(app: FastifyInstance) {
    app.post('/',{onRequest: [verifyJwt, verifyUserRole(['DEFAULT'])]}, registerPost)
    app.get('/', listPosts)
    app.get('/:publicId', getPost)
    app.patch('/:publicId', updatePost)
    app.delete('/:publicId',{onRequest: [verifyJwt, verifyUserRole(['DEFAULT'])]}, deletePost)

    app.post('/:postId/likes', registerLikePost)
    app.get('/:postId/likes', listLikesByPost)
    app.get('/:postId/comments', listComentariosByPost)
}