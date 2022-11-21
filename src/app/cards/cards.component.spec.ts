import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDataService } from '../services/pokemonData.service';

import { CardsComponent } from './cards.component';
import { allpokemonsMockResponse } from '../services/mockData';
import { of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

describe('CardsComponent', () => {
  let spy: jasmine.Spy;
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let service: PokemonDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsComponent],
      providers: [PokemonDataService],
      imports: [HttpClientTestingModule, NgxPaginationModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PokemonDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pokemon name from the servive directly', () => {
    spy = spyOn(service, 'getAllPokemons').and.returnValue(
      of(allpokemonsMockResponse)
    );
    fixture.detectChanges();
    expect(component.pokemonNames[0]).toBe('bulbasaur');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
