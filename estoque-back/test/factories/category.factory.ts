import { Category } from '@application/entities/category';

export function makeCategory(name = 'any_name'): Category {
  return new Category({ name }) as Category;
}
