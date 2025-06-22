import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../../shared/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  let isLoggedInSubject: BehaviorSubject<boolean>;
  let authServiceMock: Partial<AuthService>;

  beforeEach(() => {
    isLoggedInSubject = new BehaviorSubject<boolean>(false);
    authServiceMock = {
      isLoggedIn$: isLoggedInSubject.asObservable(),
    };

    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }, provideRouter([])],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login section when user is NOT logged in', () => {
    isLoggedInSubject.next(false);
    fixture.detectChanges();

    const loginSection = fixture.debugElement.query(By.css('.login'));
    expect(loginSection).toBeTruthy();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent.trim()).toBe('Login');
  });

  it('should NOT show login section when user IS logged in', () => {
    isLoggedInSubject.next(true);
    fixture.detectChanges();

    const loginSection = fixture.debugElement.query(By.css('.login'));
    expect(loginSection).toBeFalsy();
  });
});
