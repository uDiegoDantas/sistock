import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CategoryRepository } from '@application/repositories/category.repository';
import { PrismaCategoryRepository } from './prisma/repository/prisma-category.respository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [CategoryRepository],
})
export class DatabaseModule {}
