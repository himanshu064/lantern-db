const bitgoFunctions = require('./bitgoFunctions')
const userFunctions = require('./userFunctions')

module.exports = {
  ...Object.fromEntries(
    Object.entries(bitgoFunctions).map(([name, handler]) => [name, handler])
  ),
  ...Object.fromEntries(
    Object.entries(userFunctions).map(([name, handler]) => [name, handler])
  )
}
