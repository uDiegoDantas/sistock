import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-form.component';
import { CategoryService } from '../../category/service/category.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../../shared/models/product';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ProductDetailComponent>>;

  const fakeCategories = [
    { id: 1, name: 'Cat1', isActive: true },
    { id: 2, name: 'Cat2', isActive: false },
    { id: 3, name: 'Cat3', isActive: true },
  ];

  const fakeProduct: Product = {
    id: 1,
    name: 'Produto A',
    price: 123,
    category: { id: 1, name: 'Cat1', isActive: true },
    isActive: true,
  };

  beforeEach(async () => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['list']);
    utilsServiceSpy = jasmine.createSpyObj('UtilsService', ['onError']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatSelectModule],
      declarations: [],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: UtilsService, useValue: utilsServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { product: fakeProduct } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create component and initialize form with product data', () => {
    categoryServiceSpy.list.and.returnValue(of(fakeCategories));
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.product).toEqual(fakeProduct);

    expect(component.form.value.name).toBe(fakeProduct.name);
    expect(component.form.value.price).toBe(fakeProduct.price);
    expect(component.form.value.category).toBe(fakeProduct.category.id);
    expect(component.form.value.isActive).toBe(fakeProduct.isActive);

    expect(component.categories.length).toBe(2);
    expect(component.categories.every(c => c.isActive)).toBeTrue();
  });

  it('should handle category service error calling utilsService.onError', () => {
    categoryServiceSpy.list.and.returnValue(throwError(() => new Error('fail')));
    fixture.detectChanges();

    expect(utilsServiceSpy.onError).toHaveBeenCalledWith('Erro ao carregar categorias!');
  });