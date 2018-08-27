import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  index = 0;
  infinite = true;
  direction = 'right';
  directionToggle = true;
  autoplay = true;
  avatars = [
    {
      url: '../../assets/lib1.jpg',
      title: '1'
    },
    {
      url: '../../assets/lib2.jpg',
      title: '2'
    },
    {
      url: '../../assets/lib3.jpg',
      title: '3'
    }
  ];

  constructor() { }

}
