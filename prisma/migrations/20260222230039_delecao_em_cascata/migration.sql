-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_usuario_id_fkey";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
