describe('Check that the activity_type_selector entry point exists.', () => {
  it('Check that the page loaded.', () => {
    cy.login('admin', 'admin');
    cy.visit('fd2_examples/activity_type_selector/');
    cy.waitForPage();
  });
});
