describe('Activity Observation: Type Selector Component', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();

    cy.login('admin', 'admin');
    cy.visit('fd2/activity_observation/');

    cy.waitForPage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.saveSessionStorage();
  });

  it('Type selector exists, is visible, is enabled', () => {
    cy.get('[data-cy="activity-observation-type"]').should('exist');
    cy.get('[data-cy="selector-input"]')
      .should('be.visible')
      .should('be.enabled');
  });

  it('Selector props are correct', () => {
    cy.get('[data-cy="selector-required"]').should('be.visible');
    cy.get('[data-cy="selector-label"]').should('have.text', 'Type:');
    cy.get('[data-cy="selector-required"]').should('exist');
    cy.get('[data-cy="selector-input"]').should('have.value', null);
    cy.get('[data-cy="selector-input"]').should('not.have.class', 'is-valid');
    cy.get('[data-cy="selector-input"]').should('not.have.class', 'is-invalid');
  });

  it('Selector validity styling works', () => {
    cy.get('[data-cy="selector-input"]').invoke('val', '');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="selector-input"]').should('not.have.class', 'is-valid');
    cy.get('[data-cy="selector-input"]').should('have.class', 'is-invalid');
  });
});
