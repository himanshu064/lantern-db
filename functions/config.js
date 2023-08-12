require('dotenv').config()
const functions = require('firebase-functions')

const CONFIG_OBJ = {
  ACCESS_TOKEN: functions.config().bitgo.bitgo_access_token,
  WALLET_ID: functions.config().bitgo.bitgo_wallet_id,
  BASE_URL: functions.config().general.base_url,
  CLIENT_ID: functions.config().general.client_id,
  CLIENT_SECRET: functions.config().general.client_secret,
  REFRESH_TOKEN: functions.config().general.refresh_token,
  EMAIL_PROVIDER: functions.config().general.email_provider,
  PORTFOLIO_ID: functions.config().general.portfolio_id,
  TEST_CASES_ADDRESS: functions.config().general.test_case_address

  // ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  // WALLET_ID: process.env.WALLET_ID,
  // BASE_URL: process.env.BASE_URL,
  // CLIENT_ID: process.env.CLIENT_ID,
  // CLIENT_SECRET: process.env.CLIENT_SECRET,
  // REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  // EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
  // PORTFOLIO_ID: process.env.PORTFOLIO_ID,
  // TEST_CASES_ADDRESS: process.env.TEST_CASES_ADDRESS
}

module.exports = CONFIG_OBJ
