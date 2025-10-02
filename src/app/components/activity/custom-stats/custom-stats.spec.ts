import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStats } from './custom-stats';

describe('CustomStats', () => {
  let component: CustomStats;
  let fixture: ComponentFixture<CustomStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
