const { PORTFOLIO_ID } = require('../../../config')
const { BITGO_PATH, API_CALLS } = require('../../../constants')
const {
  cloudFunctionsStartUp,
  validateRequest,
  axiosCall
} = require('../../../helpers/generalHelpers')

exports.getPortfolioBalance = cloudFunctionsStartUp(async (req, res) => {
  if (!validateRequest(req, 'GET', res)) return
  const getPortfolioBalance = `${BITGO_PATH}/api/portfolio/v1/portfolios/${PORTFOLIO_ID}/balances`
  const portfolioBalance = await axiosCall(API_CALLS.GET, getPortfolioBalance)
  res.send({ result: portfolioBalance })
})
