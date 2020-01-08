describe('blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Dev Admin',
      username: 'devadmin',
      password: 'sulejaja',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opended', function() {
    cy.contains('login');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('devadmin');
      cy.get('#password').type('sulejaja');
      cy.contains('login').click();
    });

    it('user name is shown', function() {
      cy.contains('Dev Admin logged in');
    });

    describe('create a blog, like a blog ', function() {
      beforeEach(function() {
        cy.contains('create new').click();
        cy.get('#title').type('Awesome details about Cypress');
        cy.get('#author').type('Chika Chukwunta');
        cy.get('#url').type('https://dev.nubiit.com');
        cy.get('#likes').type('34');
        cy.get('#create').click();
      });

      it('a new blog post created', function() {
        cy.contains('Awesome details about Cypress');
      });

      it('like a blog', function() {
        cy.wait(2000);
        cy.get('tr')
          .find('a')
          .last()
          .click();
        cy.get('#like').click();
        cy.wait(1000);
        cy.contains('35 likes');
      });
    });
  });
});
