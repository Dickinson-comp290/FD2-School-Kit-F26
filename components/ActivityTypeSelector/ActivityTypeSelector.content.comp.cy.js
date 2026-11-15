import ActivityTypeSelector from '@comps/ActivityTypeSelector/ActivityTypeSelector.vue';

describe('Test the ActivityTypeSelector content', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.saveSessionStorage();
  });

  it('Checks the default UI and activity type options', () => {
    const readySpy = cy.spy().as('readySpy');

    cy.mount(ActivityTypeSelector, {
      props: {
        onReady: readySpy,
      },
    });

    cy.get('@readySpy')
      .should('have.been.calledOnce')
      .then(() => {
        cy.get('[data-cy="activity-type-selector"]').should('exist');
        cy.get('[data-cy="selector-group"]').should('exist');
        cy.get('[data-cy="selector-label"]').should('have.text', 'Type:');
        cy.get('[data-cy="selector-required"]').should('not.exist');
        cy.get('[data-cy="selector-input"]').should('exist');
        cy.get('[data-cy="selector-option-0"]').should('have.value', '');
        cy.get('[data-cy="selector-option-1"]').should(
          'have.value',
          'amendment'
        );
        cy.get('[data-cy="selector-option-12"]').should(
          'have.value',
          'transplanting'
        );
        cy.get('[data-cy="selector-input"]').should(
          'not.have.class',
          'is-valid'
        );
        cy.get('[data-cy="selector-input"]').should(
          'not.have.class',
          'is-invalid'
        );
        cy.get('[data-cy="selector-invalid-feedback"]').should(
          'contain.text',
          'An activity type is required.'
        );
        cy.get('[data-cy="selector-invalid-feedback"]').should(
          'not.be.visible'
        );
      });
  });

  it('Passes props through to the SelectorBase', () => {
    const readySpy = cy.spy().as('readySpy');

    cy.mount(ActivityTypeSelector, {
      props: {
        required: true,
        selected: 'seeding',
        showValidityStyling: true,
        onReady: readySpy,
      },
    });

    cy.get('@readySpy')
      .should('have.been.calledOnce')
      .then(() => {
        cy.get('[data-cy="selector-label"]').should('have.text', 'Type:');
        cy.get('[data-cy="selector-required"]').should('have.text', '*');
        cy.get('[data-cy="selector-input"]').should('have.value', 'seeding');
        cy.get('[data-cy="selector-input"]').should('have.class', 'is-valid');
        cy.get('[data-cy="selector-invalid-feedback"]').should(
          'contain.text',
          'An activity type is required.'
        );
      });
  });
});
