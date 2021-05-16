/// <reference types="cypress" />
import DataTransfer from '../support/dataTransfer';

function addRoutes(length) {
  Array.from({ length }).forEach((_, idx) => {
    cy.get('input[data-testid="routesListInput"]').type(`route-${idx}`);
    cy.get('form[data-testid="routesListForm"]').submit();
  });
}
context('DRAG AND DROP', () => {
  it('should load', () => {
    cy.visit('/');
  });

  it('should add routes', () => {
    addRoutes(7);
  });

  it('should remove route', () => {
    cy.contains('route-0').parent().children('button[aria-label="Delete"]').click();
  });

  it('should correctly move from top to bottom', () => {
    const expectedRoutes = ['route-0', 'route-3', 'route-4', 'route-1', 'route-5', 'route-2', 'route-6'];
    cy.visit('/');
    addRoutes(7);
    const dataTransfer = new DataTransfer();

    cy.contains('route-1').parent().trigger('dragstart', { dataTransfer });
    cy.contains('route-5').parent().trigger('drop', 'top', { dataTransfer });

    cy.contains('route-2').parent().trigger('dragstart', { dataTransfer });
    cy.contains('route-5').parent().trigger('drop', 'bottom', { dataTransfer });
    cy.get('ul').should((listNode) => {
      const routes = listNode.children();
      const routesList = Array.from({ length: routes.length }, (_, idx) => routes[idx].textContent);
      expect(routesList).eql(expectedRoutes);
    });
  });

  it('should correctly move from bottom to top', () => {
    const expectedRoutes = ['route-0', 'route-6', 'route-1', 'route-5', 'route-2', 'route-3', 'route-4'];
    cy.visit('/');
    addRoutes(7);
    const dataTransfer = new DataTransfer();
    cy.contains('route-6').parent().trigger('dragstart', { dataTransfer });
    cy.contains('route-1').parent().trigger('drop', 'top', { dataTransfer });

    cy.contains('route-5').parent().trigger('dragstart', { dataTransfer });
    cy.contains('route-1').parent().trigger('drop', 'bottom', { dataTransfer });

    cy.get('ul').should((listNode) => {
      const routes = listNode.children();
      const routesList = Array.from({ length: routes.length }, (_, idx) => routes[idx].textContent);
      expect(routesList).eql(expectedRoutes);
    });
  });
});
