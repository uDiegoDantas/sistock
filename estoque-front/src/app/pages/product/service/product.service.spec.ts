import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../../../shared/models/product';
import { Category } from '../../../shared/models/category';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  const category: Category = { id: 0, name: 'C1', isActive: true };

  const productsMock: Product[] = [
    { id: 0, name: 'p1', category, price: 11, isActive: true },
    { id: 1, name: 'p1', category, price: 12, isActive: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('Teste rota byId', () => {
    const productMock = productsMock[0];
    const id = productMock.id;

    productService.findById(id).subscribe((product) => {
      expect(product).toEqual(productMock);
      expect(product.id).toEqual(id);
    });
