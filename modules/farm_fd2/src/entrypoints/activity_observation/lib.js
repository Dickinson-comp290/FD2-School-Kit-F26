import * as farmosUtil from '@libs/farmosUtil/farmosUtil';

/**
 * Create the farmOS records (e.g. assets, quantities, and logs) that are
 * needed to represent the data in the form.  This function is called by
 * the entry point's submit method and is passed the form object from the
 * entry point.
 *
 * @param {Object} form the form containing the data from the entry point.
 * @throws {Error} if an error occurs while creating the farmOS records.
 */
async function submitForm(form) {
  try {
    /*
     * Create a farmOS observation log documenting the activity observation.
     */
    const observationOp = {
      name: 'observationOp',
      do: async () => {
        /*
         * Add a little delay here so to be sure the e2e tests have
         * enough time to see the "Submitting" toast.  Production
         * operations should not include this.
         */
        await new Promise((r) => setTimeout(r, 2000));

        /*
         * Create and return the asset, log or quantity for
         * this operation using the functions in farmosUtil.
         */
        return await farmosUtil.createObservationLog(
          form.date,
          form.type,
          form.comment
        );
      },
      undo: async (results) => {
        await farmosUtil.deleteObservationLog(results['observationOp'].id);
      },
    };
    // Add the operation to the ops for the transaction.
    ops.push(observationOp);

    // Run all of the operations in ops as a transaction.
    return await farmosUtil.runTransaction(ops);
    return await farmosUtil.createObservationLog(
      form.date,
      form.type,
      form.comment
    );
  } catch (error) {
    console.error('activity_observation lib.js:');
    console.error(error);

    let errorMsg = 'Error creating activity_observation record.';
    throw Error(errorMsg, error);
  }
}

// Export the submitForm function so that it can be used by the entry point's submit method.
export const lib = {
  submitForm,
};

/*
 * NOTE: If more than one log, asset or quantity is created then the submitForm
 *       function should use the farmosUtil.runTransaction function to create all
 *       of the logs, assets and quantities in a single transaction.  The runTransaction
 *       function provides a rollback mechanism if errors occur during the creation of
 *       any of the logs, assets or quantities.
 *
 *       See the farmosUtil.runTransaction function for details and an example.
 *
 *       Also see the lib.submitForm function in the tray_seeding and direct_seeding
 *       entry points for examples of using runTransaction in actual entry points.
 */
