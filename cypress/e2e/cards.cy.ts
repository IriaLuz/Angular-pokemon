describe('in my home page', () => {
  it('I can visits the Pokemon App default localhost', () => {
    cy.visit('http://localhost:4200/');
  });

  it('Finds the "Previous" link', () => {
    cy.contains('Previous');
  });

  it('Finds the "Next" link', () => {
    cy.contains('Next');
  });

  it('Dynamic test', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0', {
      fixture: 'pokemon-first-page.json',
    });
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*', {
      fixture: 'pokemon-1.json',
    });
    cy.visit('http://localhost:4200/');
    cy.get('app-card').first().contains('Wulbasaur');
  });

  it('Dynamic test 2', () => {
    cy.intercept(
      'GET',
      'https://pokeapi.co/api/v2/pokemon?limit=12&offset=12',
      {
        fixture: 'pokemon-second-page.json',
      }
    );
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*', {
      fixture: 'pokemon-13.json',
    });
    cy.contains('Next').click();
    cy.get('app-card').first().contains('Teedle');
  });

  it('Dynamic test 3', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0', {
      fixture: 'pokemon-first-page.json',
    });
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*', {
      fixture: 'pokemon-1.json',
    });
    cy.contains('Learn More').click();
    cy.get('app-description-page').first().contains('Wulbasaur');
  });
});
