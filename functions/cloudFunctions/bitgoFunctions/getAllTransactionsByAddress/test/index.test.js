const { default: axios } = require('axios')
const { COIN, CLOUD_FUNCTIONS_PATH } = require('../../../../constants')
const { WALLET_ID, TEST_CASES_ADDRESS } = require('../../../../test-config')

const PATH = CLOUD_FUNCTIONS_PATH + '/getAllTransactionsByAddress'

const getConfig = (
  coin = COIN,
  walletId = WALLET_ID,
  address = TEST_CASES_ADDRESS
) => ({
  params: {
    coin,
    walletId,
    address
  }
})

it('tests /getAllTransactionsByAddress endpoint - wrong method', () => {
  return expect(axios.post(PATH)).rejects.toHaveProperty(
    'response.status',
    405
  )
})

it('tests /getAllTransactionsByAddress endpoint - without params', () => {
  return expect(axios.get(PATH)).rejects.toHaveProperty('response.status', 400)
})

it('tests /getAllTransactionsByAddress endpoint - with invalid params', () => {
  return Promise.all([
    expect(axios.get(PATH, getConfig('test'))).rejects.toHaveProperty(
      'response.status',
      400
    ),
    expect(axios.get(PATH, getConfig(COIN, '1234'))).rejects.toHaveProperty(
      'response.status',
      500
    )
  ])
})

it('tests /getAllTransactionsByAddress result', async () => {
  const response = await axios.get(PATH, getConfig())

  expect(response.status).toEqual(200)
  expect(response.data).toEqual(
    expect.objectContaining({
      result: expect.arrayContaining([
        expect.objectContaining({
          actualBalance: expect.any(Number),
          actualBalanceString: expect.any(String),
          transferType: expect.any(String),
          date: expect.any(String)
        })
      ])
    })
  )
})
