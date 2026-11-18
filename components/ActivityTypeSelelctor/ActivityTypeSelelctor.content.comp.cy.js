import ActivityTypeSelelctor from '@comps/ActivityTypeSelelctor/ActivityTypeSelelctor.vue';

describe('Test the default ActivityTypeSelelctor content', () => {
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

    cy.mount(ActivityTypeSelelctor, {
      props: {
        onReady: readySpy,
      },
    });

    cy.get('@readySpy')
      .should('have.been.calledOnce')
      .then(() => {
        cy.get('[data-cy="component-group"]').should('exist');
        cy.get('[data-cy="date-input"]').should('have.attr', 'type', 'date');
        cy.get('[data-cy="selector-label"]').should('have.text', 'Type:');
        cy.get('[data-cy="selector-option-1"]').should('have.text', 'seeding');
        cy.get('[data-cy="selector-option-2"]').should(
          'have.text',
          'transplanting'
        );
        cy.get('[data-cy="selector-option-3"]').should('have.text', 'tillage');
        cy.get('[data-cy="comment-input"]').should('be.visible');

        cy.get('[data-cy="date-group"]').then(($dateGroup) => {
          cy.get('[data-cy="selector-group"]').then(($selectorGroup) => {
            expect(
              $dateGroup[0].compareDocumentPosition($selectorGroup[0]) &
                Node.DOCUMENT_POSITION_FOLLOWING
            ).to.not.equal(0);
          });
        });

        cy.get('[data-cy="selector-group"]').then(($selectorGroup) => {
          cy.get('[data-cy="comment-input"]').then(($commentInput) => {
            expect(
              $selectorGroup[0].compareDocumentPosition($commentInput[0]) &
                Node.DOCUMENT_POSITION_FOLLOWING
            ).to.not.equal(0);
          });
        });
      });
  });

  it('Check that the component props are correctly passed to the selector base subcomponent', () => {
    const readySpy = cy.spy().as('readySpy');

    cy.mount(ActivityTypeSelelctor, {
      props: {
        onReady: readySpy,
        label: 'Activity Type',
        options: ['irrigation', 'harvesting'],
      },
    });

    cy.get('@readySpy')
      .should('have.been.calledOnce')
      .then(() => {
        cy.get('[data-cy="selector-label"]').should(
          'have.text',
          'Activity Type:'
        );
        cy.get('[data-cy="selector-option-1"]').should(
          'have.text',
          'irrigation'
        );
        cy.get('[data-cy="selector-option-2"]').should(
          'have.text',
          'harvesting'
        );
        cy.get('[data-cy="selector-option-3"]').should('not.exist');
      });
  });
});
