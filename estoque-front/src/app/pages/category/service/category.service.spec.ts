import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../../../shared/models/category';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpTestingController: HttpTestingController;

  const categorysMock: Category[] = [
    { id: 0, name: 'C1', isActive: true },
    { id: 1, name: 'C2', isActive: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    categoryService = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(categoryService).toBeTruthy();
  });

  
});
