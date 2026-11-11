import { lib } from './lib';

describe('Test the %ENTRY_POINT_TITLE% lib submission', () => {
  /*
   * TODO: Create a form object that has the same format as the
   *       data.form object used in the entry point.
   *
   *       This is passed to the submitForm function as if it is
   *       coming from the entry point when the "Submit" button is clicked.
   */
  let form = {
    date: '1950-01-02',
    crop: 'ZUCCHINI', // Not in the sample form, but needed for testing
    comment: 'A comment',
  };

  let results = null;

  before(() => {
    /*
     * Submit the form using lib.submitForm from farmosUtil to create
     * all the logs, assets and quantities needed to represent a
     * %ENTRY_POINT_TITLE%.
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

  it('%ENTRY_POINT_TITLE%: Placeholder checks the sampleOp result', () => {
    /*
     * Check to be sure we get a plant asset.  This confirms that the lib.js
     * operation created the correct type of farmOS record.
     */
    expect(results.type).to.equal('asset--plant');

    /*
     * Check the parts of the result that use the parameters that
     * the lib.js operation passed to the farmosUtil.createPlantAsset
     * function.
     */
    expect(results.attributes.name).to.equal(form.date + '_' + form.crop);
    expect(results.attributes.notes.value).to.equal(form.comment);
  });

  /*
   * NOTE: If more than one log, asset or quantity is created then the submitForm
   *       function will have used the farmosUtil.runTransaction function. In that
   *       case, there should be tests to check that all of the logs, assets and quantities
   *       were created correctly. In addition, there should also be tests to check that
   *       when an error occurs during the creation of any of the logs, assets or quantities,
   *       that all of the logs, assets and quantities are rolled back and none of them are
   *       remain in the farmOS database.
   *
   *       See the lib.submit.unit.cy.js and lib.submitError.unit.cy.js files in the
   *       tray_seeding and direct_seeding entry points for examples of these tests in actual
   *       entry points.
   */
});
