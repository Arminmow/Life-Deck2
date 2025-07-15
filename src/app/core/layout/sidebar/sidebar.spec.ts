import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebar } from './sidebar';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD render nz-sider WHEN isMobile is false', () => {
    // Arrange
    component.isMobile = false;
    component.open = true;

    // Act
    fixture.detectChanges();

    // Assert
    const sider = fixture.debugElement.query(By.css('nz-sider'));
    const drawer = fixture.debugElement.query(By.css('nz-drawer'));

    expect(sider).toBeTruthy();
    expect(drawer).toBeNull();
  });

  it('SHOULD render nz-drawer WHEN isMobile is true', () => {
    // Arrange
    component.isMobile = true;
    component.open = true;

    // Act
    fixture.detectChanges();

    // Assert

    const sider = fixture.debugElement.query(By.css('nz-sider'));
    const drawer = fixture.debugElement.query(By.css('nz-drawer'));

    expect(sider).toBeNull();
    expect(drawer).toBeTruthy();
  });

  it('SHOULD emit openChange WHEN toggeling nz-sider', () => {
    // Arrange
    component.isMobile = false;
    component.open = true;
    // Act
    fixture.detectChanges();
    spyOn(component.openChange, 'emit');
    
    // Assert
    const sider = fixture.debugElement.query(By.css('nz-sider'));

    sider.triggerEventHandler('nzCollapsedChange', false);
    expect(component.openChange.emit).toHaveBeenCalledWith(true);

    sider.triggerEventHandler('nzCollapsedChange', true);
    expect(component.openChange.emit).toHaveBeenCalledWith(false);
  });

  it('SHOULD emit openChange WHEN closing ng-drawer', () => {
    // Arrange
    component.isMobile = true;
    component.open = true;
    
    // Act
    fixture.detectChanges();
    spyOn(component.openChange, 'emit');
    
    // Assert
    const drawer = fixture.debugElement.query(By.css('nz-drawer'));
    
    drawer.triggerEventHandler('nzOnClose', null);
    expect(component.openChange.emit).toHaveBeenCalledWith(false);
    
  });
});
