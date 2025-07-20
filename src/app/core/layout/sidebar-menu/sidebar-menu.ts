import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-sidebar-menu',
  imports: [NzMenuModule, CommonModule, NzToolTipModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  [x: string]: any;
  activities = [
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
      title: 'Dating',
      description: 'Exploring romantic relationships',
      icon: 'url',
      banner: 'url',
      created: '7/8/2025',
      lastPlayed: '7/8/2025',
      subActivities: [],
    },
  ];
}
