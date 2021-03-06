describe('Post Editor', () => {
  describe('v1 Editor', () => {
    beforeEach(() => {
      cy.testSetup();
      cy.fixture('users/articleEditorV1User.json').as('user');

      cy.get('@user').then((user) => {
        cy.loginUser(user).then(() => {
          cy.visit('/new');
        });
      });
    });

    it('should preview blank content of an post', () => {
      cy.findByRole('form', { name: /^Edit post$/i }).as('articleForm');

      cy.get('@articleForm')
        .findByText(/^Preview$/i)
        .click();
      cy.findByTestId('error-message').should('not.exist');
    });

    it(`should show error if the post content can't be previewed`, () => {
      cy.findByRole('form', { name: /^Edit post$/i }).as('articleForm');

      // Cause an error by having a non tag liquid tag without a tag name in the post body.
      cy.get('@articleForm')
        .findByLabelText('Post Content')
        .type('{%tag %}', { parseSpecialCharSequences: false });

      cy.get('@articleForm')
        .findByText(/^Preview$/i)
        .click();

      cy.findByTestId('error-message').should('be.visible');
    });
  });

  describe('v2 Editor', () => {
    beforeEach(() => {
      cy.testSetup();
      cy.fixture('users/articleEditorV2User.json').as('user');

      cy.get('@user').then((user) => {
        cy.loginUser(user).then(() => {
          cy.visit('/new');
        });
      });
    });

    it('should preview blank content of an post', () => {
      cy.findByRole('form', { name: /^Edit post$/i }).as('articleForm');

      cy.get('@articleForm')
        .findByText(/^Preview$/i)
        .click();
      cy.findByTestId('error-message').should('not.exist');
    });

    it(`should show error if the post content can't be previewed`, () => {
      cy.findByRole('form', { name: /^Edit post$/i }).as('articleForm');

      // Cause an error by having a non tag liquid tag without a tag name in the post body.
      cy.get('@articleForm')
        .findByLabelText('Post Content')
        .type('{%tag %}', { parseSpecialCharSequences: false });

      cy.get('@articleForm')
        .findByText(/^Preview$/i)
        .click();

      cy.findByTestId('error-message').should('be.visible');
    });
  });
});
