import { PokemonDataService } from '../pokemonData.service';
import { Component, OnInit } from '@angular/core';
import { CardType } from './card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  // providers: [CardService],
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  pokemons!: CardType;
  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.pokemonService
      .getData()
      .subscribe((pokemonsData) => (this.pokemons = pokemonsData));
  }

  // title = 'Bulbasaur';
  // image = { url: '/assets/bulbasaur.png', alt: 'bulbasaurImage' };
  // dimentions = { height: 7, weight: 69 };
  // cards: any;

  // constructor(private cardService: CardService) {}

  // ngOnInit(): void {
  //   this.getCard();
  // }

  // getCard(): void {
  //   this.cardService.getCard().subscribe((cards) => (this.cards = cards));
  // }
}
