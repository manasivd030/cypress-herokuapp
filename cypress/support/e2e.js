// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@shelex/cypress-allure-plugin'
// Clean slate before each test
beforeEach(() => {
  cy.clearCookies()
  cy.clearLocalStorage()
})

// Fail fast if the page logs JS errors (helps catch site changes)
Cypress.on('window:before:load', (win) => {
  cy.stub(win.console, 'error').as('consoleError')
})
afterEach(() => {
  cy.get('@consoleError').then((stub) => {
    // comment out if the site logs noisy errors you want to ignore
    // expect(stub).not.to.have.been.called
  })
})