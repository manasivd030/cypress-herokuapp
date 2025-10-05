describe('Herokuapp Login (E2E)', () => {
  it('logs in with valid credentials', () => {
    cy.visit('/login')
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')
    cy.contains('button', /login/i).click()

    cy.url().should('include', '/secure')
    cy.get('#flash')
      .should('be.visible')
      .should('contain.text', 'You logged into a secure area!')
  })

  it('rejects invalid username & password', () => {
    cy.visit('/login')
    cy.get('#username').type('wronguser')
    cy.get('#password').type('wrongpass')
    cy.contains('button', /login/i).click()

    cy.url().should('include', '/login')
    cy.get('#flash')
      .should('be.visible')
      .invoke('text')
      .then(t => expect(t.trim()).to.match(/Your (username|password) is invalid!/i))
  })

  it('rejects invalid password (valid username)', () => {
    cy.visit('/login')
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('badpass')
    cy.contains('button', /login/i).click()

    cy.url().should('include', '/login')
    cy.get('#flash')
      .should('be.visible')
      .should('contain.text', 'Your password is invalid!')
  })

  it('logs out after successful login', () => {
    cy.visit('/login')
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')
    cy.contains('button', /login/i).click()

    cy.url().should('include', '/secure')
    cy.contains('a', /logout/i).click()

    cy.url().should('include', '/login')
    cy.get('#flash')
      .should('be.visible')
      .should('contain.text', 'You logged out of the secure area!')
  })
})
