const admin = require('firebase-admin')
const cloudFunctions = require('./cloudFunctions')
admin.initializeApp()

module.exports = {
  ...Object.fromEntries(
    Object.entries(cloudFunctions).map(([name, handler]) => [name, handler])
  )
}
