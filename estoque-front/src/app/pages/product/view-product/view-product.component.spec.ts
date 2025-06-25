import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProductComponent } from './view-product.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UtilsService } from '../../../shared/services/utils.service';
import { StockService } from '../service/stock.service';
import { of, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../../../shared/models/category';
import { Product } from '../../../shared/models/product';
import { Stock } from '../../../shared/models/stock';

describe('ViewProductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;

  let stockServiceSpy: jasmine.SpyObj<StockService>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ViewProductComponent>>;

  const category: Category = { id: 0, name: 'C1', isActive: true };
  const product: Product = { id: 0, name: 'p1', category, price: 11, isActive: true };
  const stock: Stock = { id: 10, product, quantity: 42 };

  beforeEach(async () => {
    stockServiceSpy = jasmine.createSpyObj('StockService', ['findByProduct']);
    utilsServiceSpy = jasmine.createSpyObj('UtilsService', ['onError', 'convertToReal']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ViewProductComponent, MatDialogModule, MatIconModule, MatButtonModule],
      providers: [
        { provide: StockService, useValue: stockServiceSpy },
        { provide: UtilsService, useValue: utilsServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { product: product } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProductComponent);
    component = fixture.componentInstance;
  });

  it('should create and initialize product', () => {
    stockServiceSpy.findByProduct.and.returnValue(of(stock));
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.product).toEqual(product);
  });

  it('should load stock on init', () => {
    stockServiceSpy.findByProduct.and.returnValue(of(stock));
    fixture.detectChanges();