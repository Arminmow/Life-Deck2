import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModal } from './activity-modal';

describe('ActivityModal', () => {
  let component: ActivityModal;
  let fixture: ComponentFixture<ActivityModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD open the modal WHEN openModal is called', () => {
    // Arrange
    component.isVisible = false;

    // Act
    component.openModal();

    // Assert
    expect(component.isVisible).toBe(true);
  });

  it('SHOULD close modal WHEN closeModal is called', () => {
    // Arrange
    component.isVisible = true;

    // Act
    component.closeModal();

    // Assert
    expect(component.isVisible).toBe(false);
  });

  it('should have isVisible as false by default', () => {
    expect(component.isVisible).toBe(false);
  });

  it('should keep isVisible true if openModal is called multiple times', () => {
    // Arrange
    component.isVisible = false;

    // Act
    component.openModal();
    component.openModal();

    // Assert
    expect(component.isVisible).toBe(true);
  });

  it('should keep isVisible false if closeModal is called multiple times', () => {
    // Arrange
    component.isVisible = false;

    // Act
    component.closeModal();
    component.closeModal();

    // Assert
    expect(component.isVisible).toBe(false);
  });

  it('should toggle isVisible correctly when openModal and closeModal are called in sequence', () => {
    // Arrange
    component.isVisible = false;

    // Act

    // Assert
    component.openModal();
    expect(component.isVisible).toBe(true);
    component.closeModal();
    expect(component.isVisible).toBe(false);
  });
});
