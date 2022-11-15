import { PokemonDataService } from './services/pokemonData.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
@NgModule({
  declarations: [AppComponent, CardComponent, CardsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [PokemonDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
