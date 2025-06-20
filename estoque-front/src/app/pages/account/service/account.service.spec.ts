import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { Account } from '../../../shared/models/account';
import { AccountRequest } from '../../../shared/models/account.request';

describe('AccountService', () => {
  let accountService: AccountService;
  let httpTestingController: HttpTestingController;

  const accountsMock: Account[] = [
    { id: 0, name: 'mock1', isActive: true, userType: 0 },
    { id: 0, name: 'mock1', isActive: true, userType: 0 },
  ];

  const accountRequestMock: AccountRequest = {
    name: 'any_name',
    password: '123456789',
    confirmPassword: '123456789',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    accountService = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });

   it('Teste rota byId', () => {
    const accountMock = accountsMock[0];
    const id = accountMock.id;

    accountService.findLoggedAccount().subscribe((account) => {
      expect(account).toEqual(accountMock);
      expect(account.id).toEqual(id);
    });

    const request = httpTestingController.expectOne(`${accountService['baseUrl']}`);

    expect(request.request.method).toBe('GET');
    expect(request.request.urlWithParams).toBe(`${accountService['baseUrl']}`);
    request.flush(accountMock);
  });
});
