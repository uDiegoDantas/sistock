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

  it('should return all accounts with onlyActives disables', () => {
    accountServiceSpy.list.and.returnValue(of(mockAccounts));
    component.onlyActives.set(false);
    component.getAccounts();
    expect(accountServiceSpy.list).toHaveBeenCalled();
    expect(component.accounts.length).toBe(2);
    expect(component.filteredAccounts.length).toBe(2);
  });

  it('should filter accounts on search', () => {
    accountServiceSpy.list.and.returnValue(of(mockAccounts));
    component.ngOnInit();
    component.form.get('name')?.setValue('adm');
    expect(component.filteredAccounts.length).toBe(1);
    expect(component.filteredAccounts[0].name).toBe('Admin');
  });

  it('should clear search and disable onlyActives', () => {
    accountServiceSpy.list.and.returnValue(of(mockAccounts));
    component.ngOnInit();
    component.clearSearch();
    expect(component.form.get('name')?.value).toBeNull();
    expect(component.filteredAccounts.length).toBe(2);
    expect(component.onlyActives()).toBeFalse();
  });

  it('should open insertDialog and call insert if account is new', async () => {
    accountServiceSpy.list.and.returnValue(of([]));
    accountServiceSpy.create.and.returnValue(of(mockAccounts[0]));
    utilsServiceSpy.openDialog.and.resolveTo(mockAccounts[0]);
    component.ngOnInit();

    await component.insertDialog();

    expect(accountServiceSpy.create).toHaveBeenCalledWith(mockAccounts[0]);
    expect(snackbarServiceSpy.open).toHaveBeenCalledWith('Conta cadastrada com sucesso!');
  }); 

    it('should not insert if account already exists', async () => {
    accountServiceSpy.list.and.returnValue(of([mockAccounts[0]]));
    component.ngOnInit();
    utilsServiceSpy.openDialog.and.resolveTo(mockAccounts[0]);

    await component.insertDialog();

    expect(accountServiceSpy.create).not.toHaveBeenCalled();
    expect(utilsServiceSpy.onError).toHaveBeenCalledWith('Já existe uma conta cadastrada com esse nome.');
  });  
});
