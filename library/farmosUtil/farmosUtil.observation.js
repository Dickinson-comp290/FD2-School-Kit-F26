/*
 * Utility functions for getting and working with observations.
 */

import dayjs from 'dayjs';
import { getFarmOSInstance } from './farmosUtil.core.js';
import { getLogCategoryToTermMap } from './farmosUtil.logCategories.js';

/**
 * Create a observation log (i.e. a log of type `log--observation`).
 *
 * @param {string} observationDate = the date on which the observation log was created.
 * @param {string} logCategoryName - The name of the log category(s) to associate with the observation log.
 * @param {string} [comment = ""] a comment the comment to associate with this observation log.
 * @return {Object} the new observation log.
 * @throws {Error} if unable to create the observation log.
 *
 * @category Observation
 */
export async function createObservationLog(
  observationDate,
  logCategoryName,
  comment = ''
) {
  const farm = await getFarmOSInstance();
  const logCategoryMap = await getLogCategoryToTermMap();

  const observationName = observationDate + '_obs_' + logCategoryName;

  const logCategory = [
    {
      type: `taxonomy_term--log_category`,
      id: logCategoryMap.get(logCategoryName).id,
    },
  ];

  const log_content = {
    type: 'log--observation',
    attributes: {
      name: observationName,
      timestamp: dayjs(observationDate).format(),
      status: 'done',
      notes: { value: comment },
    },
    relationships: {
      category: logCategory,
    },
  };

  const observationLog = farm.log.create(log_content);

  await farm.log.send(observationLog);

  return observationLog;
}

/**
 * Get the observation log with the specified id.
 *
 * @param {string} observationLogId the id of the observation log.
 * @returns {Object} the observation log with the specified id.
 * @throws {Error} if unable to get the observation log.
 *
 * @category Observation
 */
export async function getObservationLog(observationLogId) {
  const farm = await getFarmOSInstance();
  const results = await farm.log.fetch({
    filter: { type: 'log--observation', id: observationLogId },
  });
  return results.data[0];
}

/**
 * Delete the observation log with the specified id.
 *
 * @param {string} observationLogId the id of the observation log.
 * @returns {Object} the deleted observation log.
 * @throws {Error} if unable to delete the observation log.
 *
 * @category Observation
 */
export async function deleteObservationLog(observationLogId) {
  const farm = await getFarmOSInstance();
  try {
    const result = await farm.log.delete('observation', observationLogId);
    return result;
  } catch (error) {
    console.error('deleteObservationLog:');
    console.error(
      'Unable to delete observation log with id: ' + observationLogId
    );
    console.error(error.message);
    console.error(error);
    throw error;
  }
}
