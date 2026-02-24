import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository";
import { GetPostUseCase } from "../../posts/get-post";

export function makeGetPostUseCase(){
    const postsRepository = new PrismaPostsRepository()
    const getPostUseCase = new GetPostUseCase(postsRepository)

    return getPostUseCase
}