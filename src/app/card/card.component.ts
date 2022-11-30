import { PokemonDataService } from '../services/pokemonData.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonType } from './card';
import { takeUntil, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() pokemonName: string = '';
  destroy$ = new Subject<void>();

  pokemon: PokemonType = { name: '', weight: 0, height: 0, src: '' };

  constructor(
    router: Router,
    private pokemonService: PokemonDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onGetPokemonData();
  }

  onGetPokemonData(): void {
    this.pokemonService
      .getPokemonData(this.pokemonName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemonData) => {
        (this.pokemon = pokemonData), (error: any) => console.log(error);
      });
  }
  // error: (e) => this.router.navigateByUrl('/404'),
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
