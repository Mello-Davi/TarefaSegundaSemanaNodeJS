import type { Prisma, Usuario } from "@/@types/prisma/client";

export interface UsuariosRepository{
    create(data: Prisma.UsuarioCreateInput): Promise<Usuario>
    findByEmail(email: string): Promise<Usuario | null>
    findBy(where: Prisma.UsuarioWhereInput): Promise<Usuario | null>
    list(): Promise<Usuario[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.UsuarioUpdateInput): Promise<Usuario>
}