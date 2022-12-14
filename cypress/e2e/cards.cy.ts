describe('in my home page', () => {
  it('I can visits the Pokemon App default localhost', () => {
    cy.visit('http://localhost:4200/');
  });

  it('has disabled "Previous" link in the fist page', () => {
    cy.visit('/');
    clickElement('li:has(span:contains(Previous))');
  });

  it('has disabled "Next" link in the last page', () => {
    cy.visit('/');
    clickElement('li:has(span:contains(Next))');
  });

  it('shows Wulbasaur as first pokemon in the first page', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0', {
      fixture: 'pokemon-first-page.json',
    });
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*', {
      fixture: 'pokemon-1.json',
    });
    cy.visit('http://localhost:4200/');
    cy.get('app-card').first().contains('Wulbasaur');
  });

  it('has Teedle as the first pokemon in the second page after clicking in "Next" link', () => {
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

  it('navigates to pokemon page description after clicking in "Learn More" button', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0', {
      fixture: 'pokemon-first-page.json',
    });
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*', {
      fixture: 'pokemon-1.json',
    });
    cy.contains('Learn More').click();
    cy.get('app-description-page').first().contains('Poison');
  });
});

const clickElement = (item: string) => {
  cy.get(item).should('have.class', 'disabled').click();
};
