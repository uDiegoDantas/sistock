import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { Category } from '../../shared/models/category';
import { of, throwError } from 'rxjs';
import { CategoryService } from './service/category.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { UtilsService } from '../../shared/services/utils.service';
import { AuthService } from '../../shared/services/auth.service';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let snackbarSpy: jasmine.SpyObj<SnackbarService>;
  let utilsSpy: jasmine.SpyObj<UtilsService>;
  let authServiceStub: Partial<AuthService>;

  const mockCategories: Category[] = [
    { id: 1, name: 'Eletrônicos', isActive: true },
    { id: 2, name: 'Alimentos', isActive: false },
  ];

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['list', 'create', 'edit', 'delete']);
    snackbarSpy = jasmine.createSpyObj('SnackbarService', ['open']);
    utilsSpy = jasmine.createSpyObj('UtilsService', ['openDialog', 'onError']);
    authServiceStub = { isAdmin$: of(true) };

    TestBed.configureTestingModule({
      imports: [CategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: SnackbarService, useValue: snackbarSpy },
        { provide: UtilsService, useValue: utilsSpy },
        { provide: AuthService, useValue: authServiceStub },
      ],
    });

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCategories and filter active by default', () => {
    categoryServiceSpy.list.and.returnValue(of(mockCategories));

    component.ngOnInit();

    expect(categoryServiceSpy.list).toHaveBeenCalled();
    expect(component.categories.length).toBe(2);
    expect(component.filteredCategories.length).toBe(1);
  });

  it('should filter categories by name and active', () => {
    categoryServiceSpy.list.and.returnValue(of(mockCategories));
    component.ngOnInit();
    component.form.get('name')?.setValue('ele');

    expect(component.filteredCategories.length).toBe(1);
    expect(component.filteredCategories[0].name).toBe('Eletrônicos');
  });

  it('should return all categorias with onlyActives disables', () => {
    categoryServiceSpy.list.and.returnValue(of(mockCategories));
    component.onlyActives.set(false);
    component.getCategories();
    expect(categoryServiceSpy.list).toHaveBeenCalled();
    expect(component.categories.length).toBe(2);
    expect(component.filteredCategories.length).toBe(2);
  });

  it('should clear search and show all categories', () => {
    categoryServiceSpy.list.and.returnValue(of(mockCategories));
    component.ngOnInit();
    component.clearSearch();

    expect(component.filteredCategories.length).toBe(2);
    expect(component.onlyActives()).toBeFalse();
  });

  it('should insert new category if it does not already exist', async () => {
    categoryServiceSpy.list.and.returnValue(of([]));
    categoryServiceSpy.create.and.returnValue(of(mockCategories[0]));
    utilsSpy.openDialog.and.resolveTo(mockCategories[0]);

    component.ngOnInit();
    await component.insertDialog();

    expect(categoryServiceSpy.create).toHaveBeenCalledWith(mockCategories[0]);
    expect(snackbarSpy.open).toHaveBeenCalledWith('Categoria cadastrada com sucesso!');
  });

  it('should not insert if category already exists', async () => {
    categoryServiceSpy.list.and.returnValue(of([mockCategories[0]]));
    utilsSpy.openDialog.and.resolveTo(mockCategories[0]);

    component.ngOnInit();
    await component.insertDialog();

    expect(categoryServiceSpy.create).not.toHaveBeenCalled();
    expect(utilsSpy.onError).toHaveBeenCalledWith('Já existe uma categoria cadastrada com esse nome.');
  });  
});
