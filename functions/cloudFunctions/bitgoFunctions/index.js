const { createAddress } = require('./createAddress')
const { getAddressBalance } = require('./getAddressBalance')
const {
  getAllTransactionsByAddress
} = require('./getAllTransactionsByAddress')
const { getBitgoWallet } = require('./getBitgoWallet')
const { getPortfolioBalance } = require('./getPortfolioBalance')
const { getPortfolioTransactions } = require('./getPortfolioTransactions')
const { getBitgoSlackWalletNotification, notifySlackMessage, testWebhook } = require('./getBitgoSlackWalletNotification')

module.exports = {
  createAddress,
  getAddressBalance,
  getAllTransactionsByAddress,
  getBitgoWallet,
  getPortfolioBalance,
  getPortfolioTransactions,
  getBitgoSlackWalletNotification,
  notifySlackMessage,
  testWebhook
}
