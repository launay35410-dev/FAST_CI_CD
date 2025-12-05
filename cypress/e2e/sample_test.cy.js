describe('FAST Starter Test', () => {
  it('Vérifie que la page se charge', () => {
    cy.visit('/');
    cy.contains('Kitchen Sink').should('be.visible');
  });
});
