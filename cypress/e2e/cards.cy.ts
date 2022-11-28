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
    cy.get('app-card').first().contains('Bulbasaur');
  });

  it('Click the "Previus" button on the first page', () => {
    cy.contains('Previous').click();
  });

  it('Click the "Next" button on the first page', () => {
    cy.contains('Next').click();
  });

  it('Click the "Learn More button" on the card', () => {
    cy.contains('Learn More').click();
  });
});
