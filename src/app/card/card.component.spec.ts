import { pokemonMockTransformed } from './../services/mockData';
import { PokemonDataService } from './../services/pokemonData.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Observable, of } from 'rxjs';
import { PokemonType } from './card';

describe('CardComponent', () => {
  let pokemon = pokemonMockTransformed;
  let component: CardComponent;
  let mockPokemonService: any;
  let fixture: ComponentFixture<CardComponent>;
  let PokemonService: PokemonDataService;
  class Mockpokemon {
    getPokemon(): Observable<PokemonType> {
      //removed the word Observable.of()
      return of(pokemon);
    }
  }

  beforeEach(async () => {
    // mockPokemonService = jasmine.createSpyObj(['getPokemon']);
    mockPokemonService = new Mockpokemon();

    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [{ provide: PokemonDataService, useValue: new Mockpokemon() }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    PokemonService = TestBed.inject(PokemonDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pokemon from the servive directly', () => {
    // mockPokemonService.getPokemon.and.returnValue(of([pokemon]));
    fixture.detectChanges();
    expect(component.pokemon.height).toBe(7);
  });
});
