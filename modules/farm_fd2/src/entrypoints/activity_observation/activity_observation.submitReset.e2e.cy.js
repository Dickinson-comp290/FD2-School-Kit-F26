import dayjs from 'dayjs';

describe('Activity Observation: Submit/Reset Buttons component', () => {
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

  it('Buttons exist, are visible, and are enabled', () => {
    cy.get('[data-cy="submit-button"]')
      .should('be.visible')
      .should('be.enabled');
    cy.get('[data-cy="reset-button"]')
      .should('be.visible')
      .should('be.enabled');
  });

  function populateForm() {
    cy.get('[data-cy="date-input"]').type(dayjs().format('1999-01-02'));

    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .select(1);

    cy.get('[data-cy="comment-input"]').type('This is a comment');
    cy.get('[data-cy="comment-input"]').blur();
  }

  it('Invalid date disables submit', () => {
    populateForm();
    cy.get('[data-cy="submit-button"]').should('be.enabled');

    cy.get('[data-cy="date-input"]').clear();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="submit-button"]').should('be.disabled');

    cy.get('[data-cy="date-input"]').type('2020-01-01');
    cy.get('[data-cy="date-input"]').blur();
    cy.get('[data-cy="submit-button"]').should('be.enabled');
  });

  it('Invalid activity type disables submit', () => {
    populateForm();
    cy.get('[data-cy="submit-button"]').should('be.enabled');

    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .select('');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="submit-button"]').should('be.disabled');

    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .select(1);
    cy.get('[data-cy="submit-button"]').should('be.enabled');
  });

  it('Reset button resets form', () => {
    populateForm();
    cy.get('[data-cy="reset-button"]').click();

    cy.get('[data-cy="date-input"]').should(
      'have.value',
      dayjs().format('YYYY-MM-DD')
    );
    cy.get('[data-cy="activity-observation-type"]')
      .find('[data-cy="selector-input"]')
      .should('have.value', '');
    cy.get('[data-cy="comment-input"]').should('have.value', '');
    cy.get('[data-cy="submit-button"]').should('be.enabled');
  });
});
