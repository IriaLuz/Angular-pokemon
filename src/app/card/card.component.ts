import { PokemonDataService } from '../services/pokemonData.service';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonType } from './card';
// import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() pokemonName: string = '';

  pokemon: PokemonType = { name: '', weight: 0, height: 0, src: '' };

  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.onGetPokemonData();
  }

  onGetPokemonData(): void {
    this.pokemonService
      .getPokemonData(this.pokemonName)
      .subscribe((pokemonData) => {
        (this.pokemon = pokemonData), (error: any) => console.log(error);
      });
  }
}
