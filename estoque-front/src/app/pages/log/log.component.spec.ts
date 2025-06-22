import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogComponent } from './log.component';
import { LogService } from './service/log.service';
import { StockService } from '../product/service/stock.service';
import { UtilsService } from '../../shared/services/utils.service';
import { of, throwError } from 'rxjs';
import { Log } from '../../shared/models/log';
import { Stock } from '../../shared/models/stock';

describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;

  let logServiceSpy: jasmine.SpyObj<LogService>;
  let stockServiceSpy: jasmine.SpyObj<StockService>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;

  const category = { id: 1, name: '', isActive: true };
  const mockLogs: Log[] = [
    {
      id: 1,
      quantity: 5,
      account: { id: 1, name: 'Admin', userType: 0, isActive: true },
      stock: {
        id: 1,
        quantity: 100,
        product: { id: 1, name: 'Mouse', category, isActive: true, price: 12 },
      },
      date: new Date(),
    },
  ];

  const mockStocks: Stock[] = [
    {
      id: 1,
      quantity: 100,
      product: { id: 1, name: 'Mouse', category, isActive: true, price: 12 },
    },
    {
      id: 2,
      quantity: 50,
      product: { id: 2, name: 'Teclado', category, isActive: true, price: 12 },
    },
  ];

  beforeEach(() => {
    logServiceSpy = jasmine.createSpyObj('LogService', ['list', 'findByStock']);
    stockServiceSpy = jasmine.createSpyObj('StockService', ['list']);
    utilsServiceSpy = jasmine.createSpyObj('UtilsService', ['onError', 'openDialog']);

    TestBed.configureTestingModule({
      imports: [LogComponent],
      providers: [
        { provide: LogService, useValue: logServiceSpy },
        { provide: StockService, useValue: stockServiceSpy },
        { provide: UtilsService, useValue: utilsServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
