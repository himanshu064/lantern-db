const path = require('path')

module.exports = {
  testMatch: [path.resolve(__dirname, './cloudFunctions/**/**/test/*.test.js')]
  // other Jest configurations
}
