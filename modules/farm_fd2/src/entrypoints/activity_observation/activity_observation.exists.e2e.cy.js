describe('Activity Observation: Entry point exists', () => {
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

  it('Page exists and renders the title', () => {
    cy.get('[data-cy="activity-observation"]').should('exist');
    cy.get('[data-cy="activity-observation-header"]').should(
      'contain.text',
      'Activity Observation'
    );
  });
});
