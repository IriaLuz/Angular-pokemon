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

  it('Click the "Previous" button on the first page', () => {
    cy.contains('Previous').click();
  });

  it('Click the "Next" button on the first page', () => {
    cy.contains('Next').click();
  });
});
