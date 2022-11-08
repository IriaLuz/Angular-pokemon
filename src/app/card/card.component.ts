import { PokemonDataService } from '../services/pokemonData.service';
import { Component, OnInit } from '@angular/core';
import { PokemonType } from './card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  pokemon: PokemonType = { name: '', weight: 0, height: 0, src: '' };
  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.onGetPokemon();
  }
  onGetPokemon(): void {
    this.pokemonService
      .getPokemon()
      .subscribe((pokemonData) => (this.pokemon = pokemonData));
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
