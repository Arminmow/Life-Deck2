import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityStats } from './activity-stats';


describe('ActivityStats', () => {
  let component: ActivityStats;
  let fixture: ComponentFixture<ActivityStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
