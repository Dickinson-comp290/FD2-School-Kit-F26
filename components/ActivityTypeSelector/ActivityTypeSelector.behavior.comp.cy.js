describe('Test the ActivityTypeSelector behavior', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.saveSessionStorage();
  });

  /*
  it('Tests the component behavior', () => {
    const readySpy = cy.spy().as('readySpy');

    cy.mount(ActivityTypeSelector, {
      props: {
        onReady: readySpy,
      },
    });

    cy.get('@readySpy').should('have.been.calledOnce');
  });
  */
});
