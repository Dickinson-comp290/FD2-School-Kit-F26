describe('Activity Observation: Activity Type Component', () => {
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

  it('Activity Type exists, is visible, is enabled', () => {
    cy.get('[data-cy="activity-observation-type"]').should('exist');
    cy.get('[data-cy="selector-input"]')
      .should('be.visible')
      .should('be.enabled');
  });

  it('Activity Type props are correct', () => {
    cy.get('[data-cy="selector-required"]').should('be.visible');
    cy.get('[data-cy="selector-label"]').should('have.text', 'Type:');
    cy.get('[data-cy="selector-input"]').should('have.value', null);

    cy.get('[data-cy="selector-option-1"]').should('have.value', 'seeding');
    cy.get('[data-cy="selector-option-3"]').should('have.value', 'tillage');

    cy.get('[data-cy="selector-input"]').should('not.have.class', 'is-valid');
    cy.get('[data-cy="selector-input"]').should('not.have.class', 'is-invalid');
  });

  it('Activity Type validity styling works', () => {
    cy.get('[data-cy="selector-input"]').select([]);
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="selector-input"]').should('not.have.class', 'is-valid');
    cy.get('[data-cy="selector-input"]').should('have.class', 'is-invalid');
  });
});
