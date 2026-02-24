import type { Prisma } from "@/@types/prisma/client";
import { prisma } from "@/libs/prisma";
import type { LikesRepository } from "../likes-repository";


export class PrismaLikesRepository implements LikesRepository {
    async create(data: Prisma.LikeUncheckedCreateInput){
        return await prisma.like.create({ data });
    }
    
    async findBy(where: Prisma.LikeWhereInput) {
        return await prisma.like.findFirst({ where });
    }
    
    async list() {
        return await prisma.like.findMany();
    }
    
    async delete(id: number) {
        await prisma.like.delete({ where: { id }})
    }
}
