describe('desktop', () => {

  it('is able to place an order', () => {
    cy.visit('/');
  
    cy.contains(/shop now/i).click();
  
    cy.get('input[type="search"]').type('chair');
    cy.contains(/bedroom/i).click();
    cy.contains(/armchair/i).click();

    cy.get('[data-cy="counter-add"]').click();
    cy.get('[data-cy="counter-add"]').click();
    cy.get('[data-cy="counter-subtract"]').click();
    cy.get('[data-cy="counter-count"]').should('have.text', '2');
    cy.contains(/add to cart/i).click();

    cy.get('[data-cy="green"]').click();
    cy.contains(/add to cart/i).click();

    cy.contains(/all in your/i);

    cy.contains(/back to products/i).click();

    cy.contains(/wooden bed/i).click();
    cy.get('[data-cy="orange"]').click();
    cy.get('[data-cy="counter-add"]').click();
    cy.get('[data-cy="counter-add"]').click();
    cy.get('[data-cy="counter-count"]').should('have.text', '3');
    cy.contains(/add to cart/i).click();
    cy.contains(/hide all notif/i).click();

    cy.contains(/guest/i).click();
    cy.contains(/login/i).click();

    cy.get('input[type="text"]').type('eva');
    cy.get('input[type="password"]').type('abcde');
    cy.get('button').contains(/login/i).click();
    cy.contains(/you are logged in, eva/i);
    cy.contains(/hide all/i).click();

    cy.contains(/eva/i).click();
    cy.contains(/cart/i).click();

    cy.contains('$7883.91');
    cy.contains(/proceed/i).click();

    cy.get('input[type="text"]').type('12345');
    cy.contains(/pay/i).click();
    cy.contains(/yes/i).click();

    cy.contains(/thank you!/i);
  });

});