describe('in my home page', () => {
  it('I can visits the Pokemon App default localhost', () => {
    cy.visit('http://localhost:4200/');
  });

  it('has disabled "Previous" link in the fist page', () => {
    cy.visit('/');
    const findInPage = () => {
      cy.get('li:has(span:contains(Previous))').then((element) => {
        // do your test
        if (element.hasClass('disabled')) {
          // on last page, break out
          return;
        }
        cy.wrap(element).click();
        findInPage();
      });
    };
    findInPage();
  });

  it('has disabled "Next" link in the last page', () => {
    cy.visit('/');
    const findInPage = () => {
      cy.get('li:has(span:contains(Next))').then((element) => {
        // do your test
        if (element.hasClass('disabled')) {
          // on last page, break out
          return;
        }
        cy.wrap(element).click();
        findInPage();
      });
    };
    findInPage();
  });

  it('Finds the "Next" link', () => {
    cy.contains('Next');
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
