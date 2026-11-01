describe('Activity Observation: Activity Component', () => {
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

  it('Activity selector exists, is visible, is enabled', () => {
    cy.get('[data-cy="activity-observation-type"]').should('exist');
    cy.get('[data-cy="activity-observation-type"] select')
      .should('be.visible')
      .should('be.enabled');
  });

  it('Activity selector props are correct', () => {
    cy.get('[data-cy="activity-observation-type"]').should('be.visible');
    cy.get('[data-cy="activity-observation-type"] select').should('exist');
  });

  it('Activity selector functionality works', () => {
    cy.get('[data-cy="activity-observation-type"] select').select('Seeding');
    cy.get('[data-cy="activity-observation-type"] select').should(
      'have.value',
      'Seeding'
    );
  });
});
