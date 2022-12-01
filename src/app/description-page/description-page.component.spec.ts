import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { pokemonMockTransformed } from '../services/mockData';
import { PokemonDataService } from '../services/pokemonData.service';

import { DescriptionPageComponent } from './description-page.component';

describe('DescriptionPageComponent', () => {
  let spy: jasmine.Spy;
  let service: PokemonDataService;
  let fixture: ComponentFixture<DescriptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionPageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionPageComponent);
    service = TestBed.inject(PokemonDataService);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set pokemon from the servive directly', () => {
    spy = spyOn(service, 'getPokemonData').and.returnValue(
      of(pokemonMockTransformed)
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.pokemon.weight).toBe(69);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
