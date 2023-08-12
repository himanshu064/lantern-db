const { BITGO_PATH, API_CALLS } = require('../../../constants')
const {
  cloudFunctionsStartUp,
  validateRequest,
  validateParameters,
  validateCoinParameters,
  axiosCall
} = require('../../../helpers/generalHelpers')

exports.getBitgoWallet = cloudFunctionsStartUp(async (req, res) => {
  if (!validateRequest(req, 'GET', res)) return
  if (!validateParameters(req.query, ['coin', 'walletId'], res)) return

  const { coin: coinParam, walletId } = req.query
  if (!validateCoinParameters(coinParam, res)) return

  const path = `${BITGO_PATH}/api/v2/${coinParam}/wallet/${walletId}`
  const result = await axiosCall(API_CALLS.GET, path)
  res.send({ result })
})
