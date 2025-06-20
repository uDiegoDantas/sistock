import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../../shared/services/auth.service';
import { AccountService } from './service/account.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { UtilsService } from '../../shared/services/utils.service';
import { of, throwError } from 'rxjs';
import { Account } from '../../shared/models/account';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;

  const mockAccounts: Account[] = [
    { id: 1, name: 'Admin', userType: 0, isActive: true },
    { id: 2, name: 'Inativo', userType: 1, isActive: false },
  ];

  beforeEach(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['list', 'create', 'delete']);
    authServiceSpy = jasmine.createSpyObj('AuthService', [], { isAdmin$: of(true) });
    snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['open']);
    utilsServiceSpy = jasmine.createSpyObj('UtilsService', ['openDialog', 'onError']);

    TestBed.configureTestingModule({
      imports: [AccountComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        { provide: UtilsService, useValue: utilsServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAccounts on init', () => {
    accountServiceSpy.list.and.returnValue(of(mockAccounts));
    component.ngOnInit();
    expect(accountServiceSpy.list).toHaveBeenCalled();
    expect(component.accounts.length).toBe(2);
    expect(component.filteredAccounts.length).toBe(1);
  });

  
});
