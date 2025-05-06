import { makeCategory } from '@test/factories/category.factory';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { FindCategoryByIdUseCase } from './find-category-by-id.usecase';
import { EntityNotFoundError } from '@application/errors/entity-not-found.error';

describe('FindCategoryById', () => {
  it('should find an existing category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const findCategoryById = new FindCategoryByIdUseCase(categoryRepository);

    await categoryRepository.create(makeCategory());
    await categoryRepository.create(makeCategory('another_name'));

    const categories = await categoryRepository.list();
    const category = await findCategoryById.execute(categories[1].id!);

    expect(category).toBe(categories[1]);
  });

  it('should throw if no category is found', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const findCategoryById = new FindCategoryByIdUseCase(categoryRepository);

    await expect(findCategoryById.execute(-999)).rejects.toThrow(
      EntityNotFoundError,
    );
  });
});
