// cypress.config.js
import { defineConfig } from 'cypress'
import allureWriter from '@shelex/cypress-allure-plugin/writer'

export default defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      allureWriter(on, config)
      return config
    },
  },

  component: {
    devServer: { framework: 'react', bundler: 'vite' },
    specPattern: 'cypress/component/**/*.cy.jsx',
    supportFile: 'cypress/support/component.js',
    setupNodeEvents(on, config) {
      allureWriter(on, config)   // <-- no require here, same ESM import
      return config
    },
  },

  env: {
    allure: true,
    allureResultsPath: 'allure-results',
    allureCleanResults: true,
  },
  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
})
