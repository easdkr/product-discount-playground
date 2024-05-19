import { Module } from '@nestjs/common';
import { ProductModule } from './productV1/product.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
