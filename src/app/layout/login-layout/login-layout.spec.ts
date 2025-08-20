import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLayout } from './login-layout';
import { GoogleOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

describe('LoginLayout', () => {
  let component: LoginLayout;
  let fixture: ComponentFixture<LoginLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLayout],
      providers : [{provide : NZ_ICONS , useValue : [GoogleOutline]}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
