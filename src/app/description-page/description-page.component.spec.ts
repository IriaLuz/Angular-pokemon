import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonDataService } from '../services/pokemonData.service';

import { DescriptionPageComponent } from './description-page.component';

describe('DescriptionPageComponent', () => {
  let service: PokemonDataService;
  let component: DescriptionPageComponent;
  let fixture: ComponentFixture<DescriptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionPageComponent],
      providers: [PokemonDataService],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionPageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PokemonDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
