import { PokemonDataService } from '../services/pokemonData.service';
import { Component, OnInit } from '@angular/core';
import { PokemonType } from './card';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  pokemon: PokemonType = { name: '', weight: 0, height: 0, src: '' };
  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.onGetPokemonData();
  }

  onGetPokemonData(): void {
    this.pokemonService
      .getPokemonData('bulbasaur')
      .pipe(tap((data) => console.log('data from pokemon', data)))
      .subscribe((pokemonData) => (this.pokemon = pokemonData));
  }
}
