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

  it('Activity type exists, is visible, is enabled', () => {
    cy.get('[data-cy="activity-observation-type"]').should('exist');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('be.visible')
      .should('be.enabled');
  });

  it('Activity Type props are correct', () => {
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-required"]')
      .should('be.visible');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-label"]')
      .should('have.text', 'Type:');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('have.value', '');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('not.have.class', 'is-valid');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('not.have.class', 'is-invalid');
  });

  it('Activity Type options are populated', () => {
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy^="selector-option-"]')
      .then(($options) => {
        const values = Array.from($options).map((option) => option.value);
        expect(values.some((value) => value !== '')).to.be.true;
      });
  });

  it('Activity Type validity styling works', () => {
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .select('');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('not.have.class', 'is-valid');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('have.class', 'is-invalid');
  });
});
