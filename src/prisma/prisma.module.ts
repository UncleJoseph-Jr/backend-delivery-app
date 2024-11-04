import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()  // ใช้ @Global() ทำให้โมดูลนี้เป็น global module
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export PrismaService เพื่อให้โมดูลอื่นสามารถใช้งานได้
})
export class PrismaModule {}
