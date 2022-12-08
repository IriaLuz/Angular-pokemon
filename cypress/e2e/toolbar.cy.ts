describe('in my home page', () => {
  it('I can visits the Pokemon App default localhost', () => {
    cy.visit('http://localhost:4200/');
  });

  it('use "Home" link to navigate home', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0', {
      fixture: 'pokemon-first-page.json',
    });

    cy.visit('pokemon/ivysaur');
    cy.get('#homeLink').click();
    cy.location('pathname').should('eq', '/');
  });

  it('use "Logo" link to navigate home', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0', {
      fixture: 'pokemon-first-page.json',
    });

    cy.visit('pokemon/ivysaur');
    cy.get('#logoLink').click();
    cy.location('pathname').should('eq', '/');
  });

  it('use "Search Pokemon" bar to find all pokemons that start with "ra"', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0', {
      fixture: 'pokemon-first-page.json',
    });
    cy.visit('/');
    cy.get('input.form-item').type('ra');
    cy.get('input:first').should(
      'have.attr',
      'placeholder',
      'Search Pokemon...'
    );
    cy.get('app-card').first().contains('Rattata');
  });
});
