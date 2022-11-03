import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  title = 'Bulbasaur';
  image = { url: '/assets/bulbasaur.png', alt: 'bulbasaurImage' };
  dimentions = { height: 7, weight: 69 };

  constructor() {}
}
