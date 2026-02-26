import type { Prisma } from "@/@types/prisma/client";
import { prisma } from "@/libs/prisma";
import type { ComentariosRepository } from "../comments-repository";

export class PrismaComentariosRepository implements ComentariosRepository {
    async create(data: Prisma.ComentarioUncheckedCreateInput){
        return await prisma.comentario.create({ data });
    }
    
    async findBy(where: Prisma.ComentarioWhereInput) {
        return await prisma.comentario.findFirst({ where });
    }
    
    async list() {
        return await prisma.comentario.findMany();
    }
    
    async delete(id: number) {
        await prisma.comentario.delete({ where: { id }})
    }
    
    async update(id: number, data: Prisma.ComentarioUpdateInput) {
        return await prisma.comentario.update({
            where: {id}, 
            data
        })
    }
    async findComentariosByUser(usuarioPublicId: string){
        return await prisma.comentario.findMany({
            where: {
                usuario: {
                    publicId: usuarioPublicId,
                },
            },
            include: {
                usuario: true,
                post: true,
            },
        });
    }
    async findComentariosByPost(postId: number) {
        return await prisma.comentario.findMany({
            where: {
                postId,
            },
            include: {
                usuario: true,
                post: true,
            },
        });
    }
}
