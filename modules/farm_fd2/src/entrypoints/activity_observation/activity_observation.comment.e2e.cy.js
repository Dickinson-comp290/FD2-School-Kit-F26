describe('Activity Observation: Comment Box', () => {
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

  it('Comment box exists and is editable', () => {
    cy.get('[data-cy="comment-input"]')
      .should('be.visible')
      .should('be.enabled');
    cy.get('[data-cy="comment-input"]').type('test comment');
    cy.get('[data-cy="comment-input"]').should('have.value', 'test comment');
  });
});
