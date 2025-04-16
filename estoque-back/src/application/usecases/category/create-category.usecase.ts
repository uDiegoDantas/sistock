import { Category } from '@application/entities/category';
import { CategoryRepository } from '@application/repositories/category.repository';
import { Injectable } from '@nestjs/common';
import { FindCategoryByNameUseCase } from './find-category-by-name.usecase';
import { EntityAlreadyExistsError } from '@application/errors/entity-already-exists.error';

export interface CreateCategoryRequest {
  name: string;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private findCategoryByName: FindCategoryByNameUseCase,
  ) {}

  async execute(request: CreateCategoryRequest): Promise<Category> {
    const { name } = request;

    const categoryExists = await this.findCategoryByName.execute(name);
    if (categoryExists) {
      throw new EntityAlreadyExistsError('Category');
    }

    const category = new Category({
      name,
    });

    return this.categoryRepository.create(category);
  }
}
