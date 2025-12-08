const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  screenshotsFolder: "reports/screenshots",
  videosFolder: "reports/videos",

  e2e: {
    baseUrl: "https://example.cypress.io",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js"
  }
});
