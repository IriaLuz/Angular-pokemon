import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PokemonType } from '../card/card';
import { PokemonDataService } from '../services/pokemonData.service';

@Component({
  selector: 'app-description-page',
  templateUrl: './description-page.component.html',
  styleUrls: ['./description-page.component.scss'],
})
export class DescriptionPageComponent implements OnInit, OnDestroy {
  pokemonName: string = '';
  destroy$ = new Subject<void>();

  pokemon: PokemonType = {
    name: '',
    weight: 0,
    height: 0,
    src: '',
    stats: [
      {
        base_stat: 0,
        effort: 0,
        stat: {
          name: '',
          url: '',
        },
      },
    ],
    types: [
      {
        slot: 0,
        type: {
          name: '',
          url: '',
        },
      },
    ],
  };

  constructor(
    private pokemonService: PokemonDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onGetPokemonData();
  }

  onGetPokemonData(): void {
    this.pokemonName = this.route.snapshot.params['name'];
    this.pokemonService
      .getPokemonData(this.pokemonName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemonData) => {
        (this.pokemon = pokemonData), (error: any) => console.log(error);
        console.log(this.pokemon, 'here the data');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
