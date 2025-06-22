import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryDetailComponent } from './category-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../shared/models/category';

describe('CategoryDetailComponent', () => {
  let component: CategoryDetailComponent;
  let fixture: ComponentFixture<CategoryDetailComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CategoryDetailComponent>>;

  const mockCategory: Category = {
    id: 1,
    name: 'Alimentos',
    isActive: true,
  };

  function createComponentWithData(categoryData: Category | null) {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [CategoryDetailComponent,],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { category: categoryData } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    });

    fixture = TestBed.createComponent(CategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
  
});
