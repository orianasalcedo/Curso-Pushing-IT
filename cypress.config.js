const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
    },
    baseUrl: 'https://pushing-it.vercel.app',
    defaultCommandTimeout: 15000,
  },

  // env: {
  //   usuario: 'Oriana',
  //   contraseña: '123456!',
  //   gender : 'female',
  //   day : '18',
  //   month : 'september',
  //   year : '1990',
  // }
});
