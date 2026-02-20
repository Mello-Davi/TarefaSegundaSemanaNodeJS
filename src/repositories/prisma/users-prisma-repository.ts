import type { Prisma } from "@/@types/prisma/client";
import { prisma } from "@/libs/prisma";
import type { UsuariosRepository } from "../users-repository";

export class PrismaUsuariosReporistory implements UsuariosRepository {
    async create(data: Prisma.UsuarioCreateInput){
        return await prisma.usuario.create({data})
    }
    async findByEmail(email: string){
        return await prisma.usuario.findFirst({
            where:{email}
        })
    }
    async findBy(where: Prisma.UsuarioWhereInput){
        return await prisma.usuario.findFirst({where})
    }

    async list(){
        return await prisma.usuario.findMany()
    }

    async delete(id: number){
        await prisma.usuario.delete({
            where: {id},
        })
    }

    async update(id: number, data: Prisma.UsuarioUpdateInput){
        return await prisma.usuario.update({
            where: {id},
            data,
        })
    }
}
