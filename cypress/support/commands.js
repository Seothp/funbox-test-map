// Why not Promise all?
// see: https://github.com/cypress-io/cypress/issues/915

Cypress.Commands.add('all', (...fns) => {
  const results = [];

  fns.reduce((prev, fn) => {
    // console.log(fn);
    fn().then((result) => results.push(result));
    return results;
  }, results);

  return cy.wrap(results);
});
