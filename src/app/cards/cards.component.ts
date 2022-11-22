import { PokemonDataService } from './../services/pokemonData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  pokemonNames: string[] = [];
  page = 1;
  totalPokemons: number = 0;
  name: string[] = [];

  constructor(private PokemonDataService: PokemonDataService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.PokemonDataService.getAllPokemons(12, this.page).subscribe(
      (response) => {
        this.totalPokemons = response.count;

        response.results.forEach((result) => {
          this.pokemonNames.push(result.name);
          console.log(this.pokemonNames);
        });
      }
    );
  }
}
