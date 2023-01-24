it('can navigate to every page', () => {
  cy.visit('http://localhost:3000');

  cy.contains('Design Your Comfort Zone');

  cy.contains('About').click();
  cy.contains('Our Story');

  cy.contains('Products').click();
  cy.contains('Search');

  cy.contains('Guest').click();
  cy.contains('Cart').click();
  cy.contains('Your cart is empty');

  cy.contains('Guest').click();
  cy.contains('Login').click();
  cy.contains('Username');
});