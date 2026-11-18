import ActivityTypeSelector from '@comps/ActivityTypeSelelctor/ActivityTypeSelelctor.vue';

describe('Test the default ActivityTypeSelector content', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.saveSessionStorage();
  });

  it('Check all of the default data-cy elements', () => {
  const readySpy = cy.spy().as('readySpy');

  cy.mount(ActivityTypeSelector, {
    props: {
      onReady: readySpy,
    },
  });

  cy.get('@readySpy')
    .should('have.been.calledOnce')
    .then(() => {
      cy.get('[data-cy="component-group"]').should('exist');
      cy.get('[data-cy="activity-observation-type"]').should('exist');
      cy.get('[data-cy="activity-observation-type"]')
            .should('contain.text', 'Type');
  });
});

it('Check that required prop is false by default', () => {
  const readySpy = cy.spy().as('readySpy');

  cy.mount(ActivityTypeSelelctor, {
    props: {
      onReady: readySpy,
    },
  });

  cy.get('@readySpy')
    .should('have.been.calledOnce')
    .then(() => {
      cy.get('[data-cy="selector-required"]').should('not.exist');
    });
});



});
