const { BITGO_PATH, API_CALLS } = require('../../../constants')
const {
  cloudFunctionsStartUp,
  validateRequest,
  validateParameters,
  validateCoinParameters,
  axiosCall,
  getActualBalance
} = require('../../../helpers/generalHelpers')

exports.getAllTransactionsByAddress = cloudFunctionsStartUp(
  async (req, res) => {
    if (!validateRequest(req, 'GET', res)) return
    if (!validateParameters(req.query, ['coin', 'walletId', 'address'], res)) {
      return
    }

    const { coin: coinParam, walletId, address } = req.query
    if (!validateCoinParameters(coinParam, res)) return

    const getTrnasactionsPath = `${BITGO_PATH}/api/v2/${coinParam}/wallet/${walletId}/transfer`
    const transactionsRes = await axiosCall(
      API_CALLS.GET,
      getTrnasactionsPath,
      { address }
    )
    const transactions =
      transactionsRes.transfers.map((transfer) => {
        const actualBalance = getActualBalance(transfer.valueString)
        return {
          ...transfer,
          actualBalance: actualBalance || 0,
          actualBalanceString: actualBalance.toString() || '0',
          transferType:
            transfer.entries.find((entry) => entry.address === address).value <
            0
              ? 'send'
              : 'receive'
        }
      }) || []
    res.send({ result: transactions })
  }
)
