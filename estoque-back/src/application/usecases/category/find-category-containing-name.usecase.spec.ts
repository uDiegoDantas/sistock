import { makeCategory } from '@test/factories/category.factory';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { FindCategoryContainingNameUseCase } from './find-category-containing-name.usecase';

describe('FindCategoryContainingNameUseCase', () => {
  it('should list categories correctly', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const findCategories = new FindCategoryContainingNameUseCase(
      inMemoryCategoryRepository,
    );
    const expected = 1;

    await inMemoryCategoryRepository.create(makeCategory());
    await inMemoryCategoryRepository.create(makeCategory('another_name'));

    const actual = (await findCategories.execute('another')).length;

    expect(actual).toBe(expected);
  });

  it('should not list if no match is found', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const findCategories = new FindCategoryContainingNameUseCase(
      inMemoryCategoryRepository,
    );
    const expected = 0;

    await inMemoryCategoryRepository.create(makeCategory());
    await inMemoryCategoryRepository.create(makeCategory('another_name'));

    const actual = (await findCategories.execute('-999')).length;

    expect(actual).toBe(expected);
  });
});
