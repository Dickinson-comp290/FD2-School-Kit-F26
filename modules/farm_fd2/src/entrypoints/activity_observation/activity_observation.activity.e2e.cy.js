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

    cy.get('[data-cy="selector-option-1"]').should('have.text', 'Amendment');
    cy.get('[data-cy="selector-option-2"]').should('have.text', 'Grazing');
    cy.get('[data-cy="selector-option-3"]').should('have.text', 'Harvest');
    cy.get('[data-cy="selector-option-4"]').should('have.text', 'Irrigation');
    cy.get('[data-cy="selector-option-5"]').should(
      'have.text',
      'Pest/Disease Control'
    );
    cy.get('[data-cy="selector-option-6"]').should('have.text', 'Seeding');
    cy.get('[data-cy="selector-option-7"]').should(
      'have.text',
      'Cover Crop Seeding'
    );
    cy.get('[data-cy="selector-option-8"]').should(
      'have.text',
      'Direct Seeding'
    );
    cy.get('[data-cy="selector-option-9"]').should('have.text', 'Seeding Tray');
    cy.get('[data-cy="selector-option-10"]').should('have.text', 'Termination');
    cy.get('[data-cy="selector-option-11"]').should('have.text', 'Tillage');
    cy.get('[data-cy="selector-option-12"]').should(
      'have.text',
      'Transplanting'
    );
    cy.get('[data-cy="selector-option-13"]').should(
      'have.text',
      'Weed Control'
    );

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
