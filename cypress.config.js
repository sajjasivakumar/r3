const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
  afterRunHandler,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  install,
  ensureBrowserFlags,
} = require("@neuralegion/cypress-har-generator");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const fs = require("fs");

const setupNodeEvents = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config, {
    omitAfterRunHandler: true,
  });
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    }),
  );
  on("after:run", async (results) => {
    if (results) {
      await afterRunHandler(config);
      fs.writeFileSync(
        "cypress/reports/results.json",
        JSON.stringify(
          {
            browserName: results.browserName,
            browserVersion: results.browserVersion,
            osName: results.osName,
            osVersion: results.osVersion,
            nodeVersion: results.config.resolvedNodeVersion,
            cypressVersion: results.cypressVersion,
            startedTestsAt: results.startedTestsAt,
            endedTestsAt: results.endedTestsAt,
          },
          null,
          "\t",
        ),
      );
    }
  });
  install(on);
  on("before:browser:launch", (browser = {}, launchOptions) => {
    ensureBrowserFlags(browser, launchOptions);
    return launchOptions;
  });
  process.env.ELECTRON_EXTRA_LAUNCH_ARGS = "--remote-debugging-port=9222";
  return config;
};

module.exports = defineConfig({
  retries: 0,
  parallels: 0,
  viewportWidth: 1920,
  viewportHeight: 1080,
  scrollBehavior: "top",
  trashAssetsBeforeRuns: false,
  chromeWebSecurity: false,
  env: {
    TAGS: "not @ignore",
    omitFiltered: true,
    filterSpecs: true,
    port: "1389",
    hars_folders: "cypress/hars",
    record_network_requests: false,
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/mocha-reports",
    reportFilename: "results",
    saveAllAttempts: false,
    embeddedScreenshots: true,
    quiet: true,
    overwrite: false,
    html: false,
    enableTestCode: false,
    enableCode: false,
    reportTitle: "API Test Results",
    reportPageTitle: "Siva Kumar",
    charts: true,
    showSkipped: true,
    code: false,
    json: true,
    timestamp: "mmddyyyy_HHMMss",
  },
  e2e: {
    baseUrl: "https://open.er-api.com/v6",
    defaultCommandTimeout: 20000,
    responseTimeout: 30000,
    specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",
    downloadsFolder: "cypress/downloads",
    supportFolder: false,
    testingType: "e2e",
    video: false,
    videoCompression: false,
    videosFolder: "cypress/videos",
    trace: true,
    traceFolder: "cypress/traces",
    setupNodeEvents,
    excludeSpecPattern: ["*.js", "*.md"],
    experimentalInteractiveRunEvents: true,
    experimentalRunAllSpecs: true,
    experimentalWebKitSupport: true,
    experimentalMemoryManagement: true,
    pageLoadTimeout: 90000,
    slowTestThreshold: 10000,
    screenshotOnRunFailure: true,
    numTestsKeptInMemory: 5,
  },
});
