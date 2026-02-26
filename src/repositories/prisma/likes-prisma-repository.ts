import type { Prisma } from "@/@types/prisma/client";
import { prisma } from "@/libs/prisma";
import type { LikesRepository } from "../likes-repository";


export class PrismaLikesRepository implements LikesRepository {
    async create(data: Prisma.LikeUncheckedCreateInput){
        return await prisma.like.create({ 
            data,
        include: {
            usuario: true,
            post: true,
            comentario: true,
        } });
    }
    async findByUserId(usuarioPublicId: string, postId?: number, comentarioId?: number) {
        return await prisma.like.findFirst({
            where: {
                usuario: {
                    publicId: usuarioPublicId,
                },
                ...(postId ? { postId } : {}),
                ...(comentarioId ? { comentarioId } : {}),
            },
            include: {
                usuario: true,
                post: true,
                comentario: true,
            },
        });
    }
    async findBy(where: Prisma.LikeWhereInput) {
        return await prisma.like.findFirst({ 
            where,
        include: {
            usuario: true,
            post: true,
            comentario: true,
        }});
    }
    
    async list() {
        return await prisma.like.findMany({
            include: {
                usuario: true,
                post: true,
                comentario: true
            }
        });
    }
    
    async delete(id: number) {
        await prisma.like.delete({ where: { id }})
    }
}
