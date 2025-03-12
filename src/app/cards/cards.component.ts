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
  isLoading = true; 

  constructor(private PokemonDataService: PokemonDataService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.isLoading = true; 
    this.PokemonDataService.getAllPokemons(12, this.page).subscribe(
      (response) => {
        this.totalPokemons = response.count;
        this.pokemonNames = response.results.map((result) => result.name);
        
        
        setTimeout(() => {
          this.isLoading = false; 
        }, 500); 
      },
      (error) => {
        console.error("Error fetching data:", error);
        this.isLoading = false; 
      }
    );
  }
}

