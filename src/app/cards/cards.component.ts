import { PokemonDataService } from './../services/pokemonData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  constructor(private PokemonDataService: PokemonDataService) {}

  pokemonNames: any = [];

  ngOnInit(): void {
    this.PokemonDataService.getAllPokemons().subscribe((response: any) =>
      response.results.forEach((result: any) => {
        this.pokemonNames.push(result.name);
      })
    );
    console.log(this.pokemonNames);
  }
}
