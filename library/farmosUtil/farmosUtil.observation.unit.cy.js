import * as farmosUtil from './farmosUtil';

describe('Test the observation log functions', () => {
  let logCategoriesMap = null;

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();

    cy.wrap(farmosUtil.getLogCategoryToTermMap()).then((map) => {
      logCategoriesMap = map;
    });
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.saveSessionStorage();
  });

  it('Create an observation log', () => {
    cy.wrap(
      farmosUtil.createObservationLog('1999-01-03', 'seeding', 'testComment')
    )
      .then((observationLog) => {
        cy.wrap(farmosUtil.getObservationLog(observationLog.id));
      })
      .then((result) => {
        expect(result.attributes.name).to.equal('1999-01-03_obs_seeding');
        expect(result.attributes.status).to.equal('done');
        expect(result.attributes.notes.value).to.equal('testComment');
        expect(result.relationships.category[0].id).to.equal(
          logCategoriesMap.get('seeding').id
        );
      });
  });

  it('Error creating observation log', { retries: 4 }, () => {
    cy.intercept('POST', '**/api/log/observation', {
      statusCode: 401,
    });

    cy.wrap(
      farmosUtil
        .createObservationLog('1999-01-03', 'seeding', 'testComment')
        .then(() => {
          throw new Error('Creating observation log should have failed.');
        })
        .catch((error) => {
          expect(error.message).to.equal('Request failed with status code 401');
        })
    );
  });

  it('Delete an observation log', () => {
    cy.wrap(
      farmosUtil.createObservationLog('1999-01-03', 'seeding', 'testComment')
    ).then((observationLog) => {
      cy.wrap(farmosUtil.deleteObservationLog(observationLog.id)).then(
        (result) => {
          expect(result.status).to.equal(204);
        }
      );
    });
  });

  it('Error deleting observation log', { retries: 4 }, () => {
    cy.intercept('DELETE', '**/api/log/observation/*', {
      statusCode: 401,
    });

    cy.wrap(
      farmosUtil
        .deleteObservationLog('1234')
        .then(() => {
          throw new Error('Deleting observation log should have failed.');
        })
        .catch((error) => {
          expect(error.message).to.equal('Request failed with status code 401');
        })
    );
  });
});
