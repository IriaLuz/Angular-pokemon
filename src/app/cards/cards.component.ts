import { PokemonDataService } from './../services/pokemonData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  pokemonNames: any = [];
  page = 1;
  totalPokemons: any;
  constructor(private PokemonDataService: PokemonDataService) {}

  ngOnInit(): void {
    this.PokemonDataService.getAllPokemons().subscribe((response: any) => {
      this.totalPokemons = response.count;

      response.results.forEach((result: any) => {
        this.pokemonNames.push(result.name);
        console.log(this.pokemonNames);
      });
    });
  }
}
