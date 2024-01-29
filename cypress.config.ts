import { defineConfig } from "cypress";
const isCI = require("is-ci");

export default defineConfig({
  e2e: {
    //        baseUrl: 'http://193.170.119.139/',
    baseUrl: isCI ? "http://193.170.119.139/" : "http://localhost:8080",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  retries: 2,
  viewportWidth: 1920,
  viewportHeight: 1080,
});
