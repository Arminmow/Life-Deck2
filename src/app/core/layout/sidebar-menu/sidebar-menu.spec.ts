import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenu } from './sidebar-menu';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SidebarMenu', () => {
  let component: SidebarMenu;
  let fixture: ComponentFixture<SidebarMenu>;
  let mockData = [
    {
      title: 'Chess',
      description: 'A strategic board game',
      icon: 'url',
      banner: 'url',
      created: '7/8/2025',
      lastPlayed: '7/8/2025',
      subActivities: [
        {
          title: 'playing chess',
          description: 'Engaging in a game of chess',
          icon: 'url',
          banner: 'url',
          created: '7/8/2025',
          timeSpent: 120,
          lastPlayed: '7/8/2025',
        },
        {
          title: 'studying openings',
          description: 'Learning various chess openings',
          icon: 'url',
          banner: 'url',
          created: '7/8/2025',
          timeSpent: 90,
          lastPlayed: '7/8/2025',
        },
      ],
    },
    {
      title: 'Gaming',
      description: 'Playing video games',
      icon: 'url',
      banner: 'url',
      created: '7/8/2025',
      lastPlayed: '7/8/2025',
      subActivities: [
        {
          title: 'playing FPS games',
          description: 'Engaging in first-person shooter games',
          icon: 'url',
          banner: 'url',
          created: '7/8/2025',
          timeSpent: 150,
          lastPlayed: '7/8/2025',
        },
        {
          title: 'streaming gameplay',
          description: 'Broadcasting gameplay live',
          icon: 'url',
          banner: 'url',
          created: '7/8/2025',
          timeSpent: 200,
          lastPlayed: '7/8/2025',
        },
      ],
    },
    {
      title: 'Walking',
      description: 'Daily walking',
      icon: 'url',
      banner: 'url',
      created: '7/7/2025',
      lastPlayed: '7/8/2025',
      subActivities: [], // no subactivities
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMenu],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD render correct number of top level menu items WHEN created', () => {
    // Arrange
    component.activities = mockData;
    // Act
    fixture.detectChanges();
    // Assert
    const submenuItems = fixture.nativeElement.querySelectorAll(
      'ul.custom-menu > li[nz-submenu]'
    );
    const singleItems = fixture.nativeElement.querySelectorAll(
      'ul.custom-menu > li[nz-menu-item]'
    );
    expect(submenuItems.length).toBe(2);
    expect(singleItems.length).toBe(1);
    expect(submenuItems.length + singleItems.length).toBe(mockData.length);
  });

  it('SHOULD render correct number of sub-activity items inside submenu WHEN created', () => {
    // Arrange
    component.activities = mockData;
    // Act
    fixture.detectChanges();
    // Assert
    const subActivityItems = fixture.nativeElement.querySelectorAll('ul.custom-menu li[nz-submenu] ul > li[nz-menu-item]');
    expect(subActivityItems.length).toBe(4); // 2 for Chess, 2 for Gaming, 0 for Walking
  });
});
