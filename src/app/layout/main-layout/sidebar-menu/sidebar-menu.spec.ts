import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideAnimations } from '@angular/platform-browser/animations';
import { SidebarMenu } from './sidebar-menu';

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

});
