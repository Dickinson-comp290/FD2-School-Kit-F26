import { lib } from './lib';
import * as farmosUtil from '@libs/farmosUtil/farmosUtil';

describe('Test the Activity Observation lib submission', () => {
  let form = {
    date: '1950-01-02',
    type: 'seeding',
    comment: 'A comment',
  };

  let results = null;
  let logCategoryMap = null;
  before(() => {
    cy.wrap(farmosUtil.getLogCategoryToTermMap()).then((map) => {
      logCategoryMap = map;
    });

    cy.wrap(lib.submitForm(form), { timeout: 10000 }).then((submitted) => {
      /*
       * submitted (and results) is an object containing the log, asset and
       * quantity objects that were submitted to farmOS by the lib.submitForm
       * function. These objects are not the actual objects that exist in the
       * farmOS database, they are the objects sent to farmOS to ask it to create
       * the logs, assets and quantities in its database. The tests below will
       * check that each of the objects in results contains the expected data
       * from the form that was submitted.
       *
       * Note checking the results (and not the database objects) here is sufficient
       * because:
       *   - The *.submission.e2e.cy.js test checks that the correct data
       *     is passed from the user interface to the submitForm function.
       *   - Checking the results here confirms that lib.submitForm has passed the
       *     correct form data to the farmosUtil library functions that create the
       *     logs, assets and quantities in the farmOS database.
       *   - The tests for the farmosUtil library functions confirm that they
       *     create the correct objects in the farmOS database for the data that
       *     they are given.
       *   - We trust that farmOS then handles the additional aspects of creating
       *     the logs, assets and quantities correctly. For example, if we create a
       *     log with a movement, we check that the log references the correct asset.
       *     But we do not check that the location of the asset has been updated.
       */
      results = submitted;
    });
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
    cy.saveSessionStorage();
  });

  it('creates an observation log with the submitted form data', () => {
    expect(results.sampleOp.type).to.equal('log--observation');
    expect(results.sampleOp.attributes.name).to.equal(
      form.date + '_obs_' + form.type
    );
    expect(results.sampleOp.attributes.notes.value).to.equal(form.comment);
    expect(results.sampleOp.relationships.category[0].id).to.equal(
      logCategoryMap.get(form.type).id
    );
  });
});
