describe('Test the ActivityTypeSelector styling', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.saveSessionStorage();
  });

  /*
  it('Tests the default component styling', () => {
    const readySpy = cy.spy().as('readySpy');

    cy.mount(ActivityTypeSelector, {
      props: {
        onReady: readySpy,
      },
    });

    cy.get('@readySpy')
      .should('have.been.calledOnce')
      .then(() => {
        cy.get('[data-cy="selector-input"]').should('not.have.class', 'is-valid');
        cy.get('[data-cy="selector-input"]').should(
          'not.have.class',
          'is-invalid'
        );
      });
  });
  */
});
