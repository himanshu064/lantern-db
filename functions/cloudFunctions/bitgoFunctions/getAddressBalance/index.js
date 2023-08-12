const { PORTFOLIO_ID } = require('../../../config')
const { BITGO_PATH, API_CALLS } = require('../../../constants')
const {
  cloudFunctionsStartUp,
  validateRequest,
  validateParameters,
  validateCoinParameters,
  axiosCall,
  getActualBalance
} = require('../../../helpers/generalHelpers')

exports.getAddressBalance = cloudFunctionsStartUp(async (req, res) => {
  if (!validateRequest(req, 'GET', res)) return
  if (!validateParameters(req.query, ['coin', 'walletId', 'address'], res)) {
    return
  }

  const { coin: coinParam, walletId, address } = req.query
  if (!validateCoinParameters(coinParam, res)) return

  const path = `${BITGO_PATH}/api/v2/${coinParam}/wallet/${walletId}/address/${address}`
  const addressObj = await axiosCall(API_CALLS.GET, path, {
    includeBalances: true
  })

  const getPortfolioBalance = `${BITGO_PATH}/api/portfolio/v1/portfolios/${PORTFOLIO_ID}/balances`
  const portfolioBalance = await axiosCall(API_CALLS.GET, getPortfolioBalance)
  const coinDetails = portfolioBalance.find(
    (balanceObj) => balanceObj.symbol.toLowerCase() === coinParam.toLowerCase()
  )

  let balanceObj = {}
  if (addressObj) {
    const actualBalance = getActualBalance(
      addressObj.balance?.confirmedBalanceString
    )
    balanceObj = {
      ...addressObj.balance,
      actualBalance: actualBalance || 0,
      actualBalanceString: actualBalance.toString() || '0',
      marketPrice: coinDetails.marketPrice,
      actualUsdBalanceString: (
        parseFloat(coinDetails.marketPrice || 0) * actualBalance
      ).toString()
    }
  }
  res.send({
    result: {
      coin: addressObj.coin,
      balance: balanceObj
    }
  })
})
