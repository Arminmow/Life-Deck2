import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityForm } from './activity-form';

describe('ActivityForm', () => {
  let component: ActivityForm;
  let fixture: ComponentFixture<ActivityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form).toBeDefined();
    expect(component.form.value).toEqual({
      title: '',
      description: '',
      icon: '',
      banner: '',
      lastActive: '',
    });
  });

  it('should require the title field', () => {
    // Arrange
    const titleControl = component.form.get('title');
    titleControl?.setValue('');

    // Act

    // Assert
    expect(titleControl?.valid).toBeFalse();
    expect(titleControl?.hasError('required')).toBeTrue();
  });

  it('should require the title to have at least 3 characters', () => {
    // Arrange
    const titleControl = component.form.get('title');
    titleControl?.setValue('ab');

    // Act

    // Assert
    expect(titleControl?.valid).toBeFalse();
    expect(titleControl?.hasError('minlength')).toBeTrue();

    titleControl?.setValue('abc');
    expect(titleControl?.valid).toBeTrue();
  });

  it('should allow empty description, icon, banner, and lastActive fields', () => {
    component.form.setValue({
      title: 'Valid Title',
      description: '',
      icon: '',
      banner: '',
      lastActive: '',
    });

    // Assert
    expect(component.form.valid).toBeTrue();
  });
});
