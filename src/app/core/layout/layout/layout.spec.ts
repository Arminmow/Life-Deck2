import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuOutline, MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';


import { LayoutComponent } from './layout';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

describe('Layout', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [provideAnimations(), {
        provide : NZ_ICONS,
        useValue: [MenuOutline, MenuFoldOutline, MenuUnfoldOutline]
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
