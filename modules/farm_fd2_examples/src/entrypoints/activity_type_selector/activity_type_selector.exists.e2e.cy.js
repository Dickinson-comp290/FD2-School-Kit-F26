describe('Check that the activity_type_selector entry point in farm_fd2_examples exists.', () => {
  it('Check that the page loaded.', () => {
    // Login if running in live farmOS.
    cy.login('admin', 'admin');
    // Go to the main page.
    cy.visit('fd2_examples/activity_type_selector/');
    // Check that the page loads.
    cy.waitForPage();
  });
});
