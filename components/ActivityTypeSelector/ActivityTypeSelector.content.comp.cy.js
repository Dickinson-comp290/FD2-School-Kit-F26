import ActivityTypeSelector from '@comps/ActivityTypeSelector/ActivityTypeSelector.vue';

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

    /*
     * See the Components Guide (`docs/contributing/components.md` for more
     * information about component testing. Also, see other components in
     * the `components/` directory for examples.
     */
    const readySpy = cy.spy().as('readySpy');

    cy.mount(ActivityTypeSelector, {
      props: {
        onReady: readySpy,
      },
    });

    cy.get('@readySpy')
      .should('have.been.calledOnce')
      .then(() => {
        /*
         * Replace this assertion with assertions that check that all of the
         * default data-cy elements exist and have the correct initial content.
         */
        cy.get('[data-cy="component-group"]').should('exist');
        cy.get('[data-cy="activity-observation-type"]').should('exist');
        cy.get('[data-cy="selector-group"]').should('exist');
      });
  });

  it('Check that required prop is false by default', () => {
    const readySpy = cy.spy().as('readySpy');

    cy.mount(ActivityTypeSelector, {
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

  it('Check that props are passed through to the SelectorBase', () => {
    const readySpy = cy.spy().as('readySpy');

    cy.mount(ActivityTypeSelector, {
      props: {
        required: true,
        showValidityStyling: true,
        onReady: readySpy,
      },
    });

    cy.get('@readySpy')
      .should('have.been.calledOnce')
      .then(() => {
        cy.get('[data-cy="selector-label"]').should('contain.text', 'Type');
        cy.get('[data-cy="selector-required"]').should('have.text', '*');
        cy.get('[data-cy="selector-invalid-feedback"]').should(
          'contain.text',
          'An activity type is required'
        );
        cy.get('[data-cy="selector-input"]').should('exist');
      });
  });

});
