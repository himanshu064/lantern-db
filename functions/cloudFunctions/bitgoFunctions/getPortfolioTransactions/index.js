const { PORTFOLIO_ID } = require('../../../config')
const { BITGO_PATH, API_CALLS } = require('../../../constants')
const {
  cloudFunctionsStartUp,
  validateRequest,
  axiosCall
} = require('../../../helpers/generalHelpers')

exports.getPortfolioTransactions = cloudFunctionsStartUp(async (req, res) => {
  if (!validateRequest(req, 'GET', res)) return
  const getTrnasactionsPath = `${BITGO_PATH}/api/portfolio/v1/portfolios/${PORTFOLIO_ID}/transactions`
  const transactions = await axiosCall(API_CALLS.GET, getTrnasactionsPath)
  res.send({ result: transactions.data })
})
