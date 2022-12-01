import { CardsComponent } from './../cards/cards.component';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ToolbarComponent } from './toolbar.component';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';

describe('ToolbarComponent', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ToolbarComponent, CardsComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(ToolbarComponent);
  });

  it('should render "HOME" link in the toolbar', () => {
    const link =
      fixture.debugElement.nativeElement.querySelector('#homeLink').textContent;
    expect(link).toContain('HOME');
  });

  it('should click in "Home" link and navigate to home page', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/');
  }));
});
