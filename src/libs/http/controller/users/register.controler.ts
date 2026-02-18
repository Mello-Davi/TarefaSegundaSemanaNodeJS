import z from "zod"
import { prisma } from "@/libs/prisma.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string().trim().min(1).max(100),
        email: z.email().min(1).max(100),
        senha: z.string().min(8).max(100),
        foto: z.string().optional().nullable()
    })

    const {nome, email, senha, foto} = registerBodySchema.parse(request.body)

    const user = await prisma.usuario.create({
        data: {
            nome,
            email,
            passwordHash: senha,
            foto: foto ?? null
            
        }   
    })
    return reply.status(201).send(user)
}