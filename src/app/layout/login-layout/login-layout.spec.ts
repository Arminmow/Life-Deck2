import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLayout } from './login-layout';
import { GoogleOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { AuthService } from '../../services/auth/auth-service';
import { By } from '@angular/platform-browser';

describe('LoginLayout', () => {
  let component: LoginLayout;
  let fixture: ComponentFixture<LoginLayout>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signInWithGoogle']);

    await TestBed.configureTestingModule({
      imports: [LoginLayout],
      providers: [
        { provide: NZ_ICONS, useValue: [GoogleOutline] },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD render correct title ', () => {
    // Arrange
    const title = fixture.nativeElement.querySelector('[data-testId="title"]');

    // Act

    // Assert
    expect(title.textContent).toContain('Life Deck 2');
  });

  it('SHOULD call signInWithGoogle WHEN signIn is called', () => {
    // Arrange

    // Act
    component.signIn();

    // Assert
    expect(authServiceSpy.signInWithGoogle).toHaveBeenCalled();
  });
});
