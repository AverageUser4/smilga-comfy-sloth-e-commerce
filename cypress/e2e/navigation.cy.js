/*
  - each page that should be able to be accessed can be accessed regardless whether
  user is logged in or app is in mobile / desktop view
*/

describe('desktop view', () => {

  it('can navigate to every page', () => {
    cy.visit('/');
    cy.location('pathname').should('equal', '/');
    cy.document().its('title').should('match', /home/i);

    cy.contains(/about/i).click();
    cy.location('pathname').should('equal', '/about');
    cy.document().its('title').should('match', /about us/i);

    cy.contains(/products/i).click();
    cy.location('pathname').should('equal', '/products');
    cy.document().its('title').should('match', /products/i);
  
    cy.contains(/bar stool/i).click();
    cy.location('pathname').should('match', /\/products\/.{5}/);
    cy.document().its('title').should('match', /bar stool/i);
    /* add product to cart so link to cart changelog appears when user is logged in */
    cy.contains(/add to cart/i).click();
    /* notification covers guest button */
    cy.contains(/hide all/i).click();

    cy.contains(/guest/i).click();
    cy.contains(/cart/i).click();
    cy.location('pathname').should('equal', '/cart');
    cy.document().its('title').should('match', /cart/i);

    cy.contains(/guest/i).click();
    cy.contains(/login/i).click();
    cy.location('pathname').should('equal', '/login');
    cy.document().its('title').should('match', /login/i);

    /* login as there are paths that are not shown to guest */
    cy.get('input[type="text"]').type('adam');
    cy.get('input[type="password"]').type('qwerty');
    cy.get('button').contains(/login/i).click();
    cy.contains(/you are logged in, adam/i);
    /* notification about changes to cart should appear */
    cy.contains(/hide all/i).click();

    cy.contains('adam').click();
    cy.contains(/cart changelog/i).click();
    cy.location('pathname').should('equal', '/cart-changelog');
    cy.document().its('title').should('match', /cart changelog/i);

    cy.contains(/checkout/i).click();
    cy.location('pathname').should('equal', '/checkout');
    cy.document().its('title').should('match', /checkout/i);
  });

});

describe('mobile view', { viewportWidth: 400, viewPortHeight: 660 }, () => {

  it('can navigate to every page', () => {
    cy.visit('/');
    cy.location('pathname').should('equal', '/');
    cy.document().its('title').should('match', /home/i);

    cy.get('button[data-cy="nav-open"]').click();
    cy.contains(/about/i).click();
    cy.location('pathname').should('equal', '/about');
    cy.document().its('title').should('match', /about us/i);

    cy.get('button[data-cy="nav-open"]').click();
    cy.contains(/products/i).click();
    cy.location('pathname').should('equal', '/products');
    cy.document().its('title').should('match', /products/i);
  
    cy.contains(/bar stool/i).click();
    cy.location('pathname').should('match', /\/products\/.{5}/);
    cy.document().its('title').should('match', /bar stool/i);
    cy.contains(/add to cart/i).click();
    cy.contains(/hide all/i).click();

    cy.get('button[data-cy="nav-open"]').click();
    cy.contains(/cart/i).click();
    cy.location('pathname').should('equal', '/cart');
    cy.document().its('title').should('match', /cart/i);

    cy.get('button[data-cy="nav-open"]').click();
    cy.contains(/login/i).click();
    cy.location('pathname').should('equal', '/login');
    cy.document().its('title').should('match', /login/i);

    cy.get('input[type="text"]').type('adam');
    cy.get('input[type="password"]').type('qwerty');
    cy.get('button').contains(/login/i).click();
    cy.contains(/you are logged in, adam/i);
    cy.contains(/hide all/i).click();

    /* it twice happened that the test failed here, because notification did not get hidden,
      bug in Notification causing it (setting notificationsRef in function body instead of ref)
      probably caused it and was fixed, but watch out */
    cy.get('button[data-cy="nav-open"]').click();
    cy.contains(/cart changelog/i).click();
    cy.location('pathname').should('equal', '/cart-changelog');
    cy.document().its('title').should('match', /cart changelog/i);

    cy.get('button[data-cy="nav-open"]').click();
    cy.contains(/checkout/i).click();
    cy.location('pathname').should('equal', '/checkout');
    cy.document().its('title').should('match', /checkout/i);
  });

});