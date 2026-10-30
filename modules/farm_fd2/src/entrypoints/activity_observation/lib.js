import * as farmosUtil from '@libs/farmosUtil/farmosUtil';

export async function submitForm(formData) {
  // The UI shows title-cased activity names, but the farmOS taxonomy terms are
  // stored with lowercase names. The utility handles the normalization, so we
  // keep the original label for the log name while using the normalized term for
  // the farmOS category lookup.
  return await farmosUtil.createObservationLog(
    formData.date,
    formData.type,
    formData.comment || ''
  );
}

export const lib = {
  submitForm,
};
