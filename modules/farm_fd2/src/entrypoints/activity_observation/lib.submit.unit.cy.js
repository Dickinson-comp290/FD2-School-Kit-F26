import { lib } from './lib';

describe('Test the Activity Observation lib submission', () => {
  /*
   * TODO: Create a form object that has the same format as the
   *       data.form object used in the entry point.
   *
   *       This is passed to the submitForm function as if it is
   *       coming from the entry point when the "Submit" button is clicked.
   */
  let form = {
    date: '1950-01-02',
    type: 'seeding', // Not in the sample form, but needed for testing
    comment: 'A comment',
  };

  let results = null;
  let logCategoryMap = null;
  before(() => {
    /*
     * TODO: Load any maps or other data from the API that will be needed
     *       by the tests.
     *
     *       For examples, see the before() function in lib.submit.unit.cy.js in:
     *         - modules/farm_fd2/src/entrypoints/tray_seeding
     *         - modules/farm_fd2/src/entrypoints/direct_seeding
     */
    cy.wrap(farmosUtil.getLogCategoryToTermMap()).then((map) => {
      logCategoryMap = map;
    });

  before(() => {
    /*
     * Submit the form using lib.submitForm from farmosUtil to create
     * all the logs, assets and quantities needed to represent a
     * Activity Observation.
     */
    cy.wrap(lib.submitForm(form), { timeout: 10000 }).then((submitted) => {
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

  /*
   * TODO: Adapt this test and add others as necessary. There should be
   *       One test for each log, asset and quantity that is created by
   *       the lib.submitForm function. Generally, this will be one test
   *       for each operation in lib.submitForm.
   *
   *       The goal of each test is to ensure that the lib.js operation has
   *       passed the correct form data to the farmosUtil function that is
   *       creating the log, asset or quantity.
   *
   *       For example, the sampleOp creates a plant asset. The documentation
   *       for the farmosUtil.createPlantAsset function shows it accepts arguments
   *       for the date, cropName, comment and parents. Thus, the test will
   *       check the parts of the results object that use those parameters to
   *       confirm that they agree with what is expected based on the form data
   *       that was submitted.
   *
   *       See examples of tests in the lib.submit.unit.cy.js files in:
   *         - modules/farm_fd2/src/entrypoints/tray_seeding
   *         - modules/farm_fd2/src/entrypoints/direct_seeding
   */
  it('Activity Observation: Checks the observation log result', () => {
    /*
     * Check to be sure we get a plant asset.  This confirms that the lib.js
     * operation created the correct type of farmOS record.
     */
    expect(results.sampleOp.type).to.equal('log--observation');

    /*
     * Check the parts of the result that use the parameters that
     * the lib.js operation passed to the farmosUtil.createObservationLog
     * function.
     */
    expect(results.sampleOp.attributes.name).to.equal(
      form.date + '_obs_' + form.type
    );
    expect(results.sampleOp.attributes.notes.value).to.equal(form.comment);
    expect(results.sampleOp.relationships.category[0].id).to.equal(
      logCategoryMap.get(form.type).id
    );
  });
});

