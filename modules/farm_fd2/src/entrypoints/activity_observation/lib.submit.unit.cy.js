import { lib } from './lib.js';

describe('Activity Observation: lib submission', () => {
  const form = {
    date: '1950-01-02',
    type: 'Seeding',
    comment: 'A comment',
  };

  let results = null;

  before(() => {
    cy.restoreLocalStorage();
    cy.restoreSessionStorage();

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

  it('creates an observation log with the selected activity type', () => {
    expect(results.type).to.equal('log--observation');
    expect(results.attributes.name).to.equal(form.date + '_obs_' + form.type);
    expect(results.attributes.notes.value).to.equal(form.comment);
  });
});
