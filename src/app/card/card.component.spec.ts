import {
  pokemonMockTransformed,
  pokemonMockTransformedSecondReq,
} from './../services/mockData';
import { PokemonDataService } from './../services/pokemonData.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CardComponent', () => {
  let spy: jasmine.Spy;
  let service: PokemonDataService;
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [PokemonDataService],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PokemonDataService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pokemon from the servive directly', () => {
    spy = spyOn(service, 'getPokemonData').and.returnValue(
      of(pokemonMockTransformed)
    );
    component.ngOnInit();
    expect(component.pokemon.height).toBe(7);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set pokemon from the servive directly', () => {
    spy = spyOn(service, 'getPokemonData').and.returnValue(
      of(pokemonMockTransformedSecondReq)
    );
    component.ngOnInit();
    expect(component.pokemon.height).toBe(9);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

// //another way to write the same test
// import { pokemonMockTransformed } from './../services/mockData';
// import { PokemonDataService } from './../services/pokemonData.service';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CardComponent } from './card.component';
// import { of } from 'rxjs';

// describe('CardComponent', () => {
//   // let pokemon = pokemonMockTransformed;
//   let component: CardComponent;
//   //it is ok to add here any as time isnot a problem
//   let mockPokemonService: any;
//   let fixture: ComponentFixture<CardComponent>;
//   let PokemonService: PokemonDataService;
//   // class Mockpokemon {
//   //   getPokemonData(): Observable<PokemonType> {
//   //     //removed the word Observable.of() is deprecated
//   //     return of(pokemonMockTransformed);
//   //   }
//   // }
//   //instead to have the class mockpokemon do this:
//   //Why in here I did not use the observable
//   const stubPokemonService = {
//     getPokemonData: () => of(pokemonMockTransformed),
//   };

//   beforeEach(async () => {
//     // before stubPokemonService I have this:
//     //mockPokemonService = new Mockpokemon();

//     await TestBed.configureTestingModule({
//       declarations: [CardComponent],
//       providers: [
//         { provide: PokemonDataService, useValue: stubPokemonService }, // before I called here the instance new class Mockpokemon()
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(CardComponent);
//     component = fixture.componentInstance;
//     PokemonService = TestBed.inject(PokemonDataService);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should set pokemon from the servive directly', () => {
//     fixture.detectChanges();
//     expect(component.pokemon.height).toBe(7);
//   });
// });
