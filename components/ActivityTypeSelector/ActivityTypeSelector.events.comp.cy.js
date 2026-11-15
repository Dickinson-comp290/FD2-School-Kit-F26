import ActivityTypeSelector from '@comps/ActivityTypeSelector/ActivityTypeSelector.vue';

describe('Test the ActivityTypeSelector events', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.saveSessionStorage();
  });

  it('Emits "update:selected" when the selection changes', () => {
    const readySpy = cy.spy().as('readySpy');
    const updateSpy = cy.spy().as('updateSpy');

    cy.mount(ActivityTypeSelector, {
      props: {
        onReady: readySpy,
        'onUpdate:selected': updateSpy,
      },
    });

    cy.get('@readySpy')
      .should('have.been.calledOnce')
      .then(() => {
        cy.get('[data-cy="selector-input"]').select('seeding');
        cy.get('@updateSpy').should('have.been.calledOnce');
        cy.get('@updateSpy').should('have.been.calledWith', 'seeding');
      });
  });
});
