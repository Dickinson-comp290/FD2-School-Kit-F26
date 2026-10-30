describe('Activity Observation: Submission tests', () => {
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

  function submitForm() {
    cy.get('[data-cy="date-input"]').clear();
    cy.get('[data-cy="date-input"]').type('1950-01-02');

    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .select(1);

    cy.get('[data-cy="comment-input"]').type('test comment');
    cy.get('[data-cy="comment-input"]').blur();

    cy.get('[data-cy="submit-button"]').click();
  }

  it('Test successful submission', () => {
    cy.window().then((win) => {
      cy.spy(win.lib, 'submitForm').as('submitFormSpy');
    });

    submitForm();

    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('[data-cy="reset-button"]').should('be.disabled');

    cy.get('.toast')
      .should('be.visible')
      .should('contain.text', 'Submitting Activity Observation...');

    cy.get('.toast', { timeout: 10000 })
      .should('be.visible')
      .should('contain.text', 'Activity Observation created.');

    cy.get('@submitFormSpy').then((spy) => {
      expect(spy).to.be.calledOnce;

      const formData = spy.getCall(0).args[0];
      expect(formData.date).to.equal('1950-01-02');
      expect(formData.type).to.not.equal(null);
      expect(formData.comment).to.equal('test comment');
    });

    cy.get('[data-cy="date-input"]').should('have.value', '1950-01-02');
    cy.get('[data-cy="comment-input"]').should('have.value', '');
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('have.value', '');

    cy.get('.toast').should('not.exist');
    cy.get('[data-cy="submit-button"]').should('be.enabled');
    cy.get('[data-cy="reset-button"]').should('be.enabled');
  });

  it('Test submission with network error', () => {
    cy.intercept('**/api/**/*', {
      statusCode: 401,
    });

    submitForm();

    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('[data-cy="reset-button"]').should('be.disabled');

    cy.get('.toast')
      .should('be.visible')
      .should('contain.text', 'Error creating Activity Observation records.');
    cy.get('.toast', { timeout: 7000 }).should('not.exist');

    cy.get('[data-cy="submit-button"]').should('be.enabled');
    cy.get('[data-cy="reset-button"]').should('be.enabled');
  });
});
