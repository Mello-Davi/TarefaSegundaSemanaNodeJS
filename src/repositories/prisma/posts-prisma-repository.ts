import type { Prisma } from "@/@types/prisma/client";
import { prisma } from "@/libs/prisma";
import type { PostsRepository } from "../posts-repository";

export class PrismaPostsRepository implements PostsRepository {
    async create(data: Prisma.PostUncheckedCreateInput){
        return await prisma.post.create({ data });
    }
    
    async findBy(where: Prisma.PostWhereInput) {
        return await prisma.post.findFirst({ where });
    }
    
    async list() {
        return await prisma.post.findMany();
    }
    
    async delete(id: number) {
        await prisma.post.delete({ where: { id }})
    }
    
    async update(id: number, data: Prisma.PostUpdateInput) {
        return await prisma.post.update({
            where: {id}, 
            data
        })
    }
    async findPostsByUser(usuarioPublicId: string){
        return await prisma.post.findMany({
            where: {
                usuario: {
                    publicId: usuarioPublicId,
                },
            },
            include: {
                usuario: true,
            },
        });
    }
}
