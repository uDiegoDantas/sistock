import { Category } from './category';

describe('Category', () => {
  it('should be able to create a new category', () => {
    const category = new Category({ name: 'any_name' });
    expect(category).toBeTruthy();
  });

  it('should create a new category with correct values', () => {
    const category = new Category({ name: 'any_name' });

    expect(category.id).toBeUndefined();
    expect(category.name).toBe('any_name');
  });

  it('should update category with correct values', () => {
    const category = new Category({ name: 'any_name' });
    category.name = 'another_name';
    expect(category.name).toBe('another_name');
  });
});
