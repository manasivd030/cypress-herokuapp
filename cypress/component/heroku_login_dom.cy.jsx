import React from 'react'
import { mount } from 'cypress/react'

function RemoteHtml({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

describe('Herokuapp Login – DOM contract (Component Test)', () => {
  const url = 'https://the-internet.herokuapp.com/login'

  it('has username, password, and a submit button with expected labels', () => {
    cy.request('GET', url).then((res) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(res.body, 'text/html')
      const mountNode = doc.querySelector('#content') || doc.body

      mount(<RemoteHtml html={mountNode.innerHTML} />)

      cy.get('#username').should('have.attr', 'type', 'text')
      cy.get('#password').should('have.attr', 'type', 'password')

      cy.get('button[type="submit"]')
        .should('exist')
        .and('be.visible')
        .invoke('text')
        .then((t) => expect(t.trim().toLowerCase()).to.include('login'))

      cy.contains('label', /username/i).should('exist')
      cy.contains('label', /password/i).should('exist')
      cy.contains(/login page/i).should('exist')
    })
  })
})
