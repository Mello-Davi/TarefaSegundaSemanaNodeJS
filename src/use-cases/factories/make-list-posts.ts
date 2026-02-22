import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository";
import { ListPostUseCase } from "../posts/list-posts";

export function makeListPostUseCase(){
    const postsRepository = new PrismaPostsRepository()
    const listPostUseCase = new ListPostUseCase(postsRepository)

    return listPostUseCase
}