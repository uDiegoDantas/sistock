import { DatabaseModule } from '@infra/database/databale.module';
import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CreateCategoryUseCase } from '@application/usecases/category/create-category.usecase';
import { DeleteCategoryUseCase } from '@application/usecases/category/delete-category.usecase';
import { FindCategoryByIdUseCase } from '@application/usecases/category/find-category-by-id.usecase';
import { FindCategoryByNameUseCase } from '@application/usecases/category/find-category-by-name.usecase';
import { ListCategoriesUseCase } from '@application/usecases/category/list-categories.usecase';
import { UpdateCategoryUseCase } from '@application/usecases/category/update-category.usecase';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FindCategoryContainingNameUseCase } from '@application/usecases/category/find-category-containing-name.usecase';
@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    FindCategoryByIdUseCase,
    FindCategoryByNameUseCase,
    FindCategoryContainingNameUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
})
export class HttpModule {}
