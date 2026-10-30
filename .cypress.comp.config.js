import { defineConfig } from 'cypress';
import { execSync } from 'child_process';

const installDbScript = new URL('./bin/installDB.bash', import.meta.url).pathname;

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  trashAssetsBeforeRuns: true,
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  component: {
    allowCypressEnv: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    supportFile: '../cypress/support/component.js',
    indexHtmlFile: '../cypress/support/component-index.html',
    specPattern: '**/*.comp.cy.js',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        logObject(obj) {
          console.log(JSON.stringify(obj, null, 2));
          return null;
        },
        initDB() {
          execSync(`${installDbScript} --current`, { stdio: 'inherit' });
          return null;
        },
      }),
        on('before:run', () => {
          execSync(`${installDbScript} --current`, { stdio: 'inherit' });
          return null;
        });
    },
  },
});
