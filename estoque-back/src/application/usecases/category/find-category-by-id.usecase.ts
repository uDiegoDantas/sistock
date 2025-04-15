import { Category } from '@application/entities/category';
import { EntityNotFoundError } from '@application/errors/entity-not-found.error';
import { CategoryRepository } from '@application/repositories/category.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCategoryByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number): Promise<Category> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new EntityNotFoundError('Category');
    }
    return category;
  }
}
