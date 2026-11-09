describe('Activity Observation: Selector Component', () => {
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

  it('Selector exists, is visible, and is enabled', () => {
    cy.get('[data-cy="activity-observation-type"]').should('exist');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('be.visible')
      .should('be.enabled');
  });

  it('Selector is required and starts blank', () => {
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-required"]')
      .should('be.visible');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('have.value', null);
  });

  it('Selector contains the available activity types', () => {
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"] option')
      .should('have.length', 4);
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-option-1"]')
      .should('have.value', 'Seeding');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-option-2"]')
      .should('have.value', 'Transplanting');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-option-3"]')
      .should('have.value', 'Tillage');
  });

  it('Selector validity styling works', () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('have.class', 'is-invalid');

    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .select('Seeding');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('not.have.class', 'is-invalid');
  });
});
