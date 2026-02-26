import { PrismaComentariosRepository } from "@/repositories/prisma/comments-prisma-repository"
import { ListComentariosByUserUseCase } from "@/use-cases/comments/list-comments-by-user"


export function makeListComentariosByUserUseCase(){
    const comentariosRepository = new PrismaComentariosRepository()
    
    const listComentariosByUserUseCase = new ListComentariosByUserUseCase(comentariosRepository)

    return listComentariosByUserUseCase
}