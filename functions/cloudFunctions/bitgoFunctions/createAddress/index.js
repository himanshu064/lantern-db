const { WALLET_ID } = require('../../../config')
const { BITGO_PATH, COIN, API_CALLS } = require('../../../constants')
const {
  cloudFunctionsStartUp,
  validateRequest,
  axiosCall
} = require('../../../helpers/generalHelpers')

exports.createAddress = cloudFunctionsStartUp(async (req, res) => {
  if (!validateRequest(req, 'POST', res)) return

  const createAddressPath = `${BITGO_PATH}/api/v2/${COIN}/wallet/${WALLET_ID}/address`
  const address = await axiosCall(API_CALLS.POST, createAddressPath)
  res.send(address)
})
