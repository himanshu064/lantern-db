const { default: axios } = require('axios')
const { COIN, CLOUD_FUNCTIONS_PATH } = require('../../../../constants')
const { WALLET_ID } = require('../../../../test-config')

const PATH = CLOUD_FUNCTIONS_PATH + '/getBitgoWallet'

const getConfig = (coin = COIN, walletId = WALLET_ID) => ({
  params: {
    coin,
    walletId
  }
})

it('tests /getBitgoWallet endpoint - wrong method', () => {
  return expect(axios.post(PATH)).rejects.toHaveProperty(
    'response.status',
    405
  )
})

it('tests /getBitgoWallet endpoint - without params', () => {
  return expect(axios.get(PATH)).rejects.toHaveProperty('response.status', 400)
})

it('tests /getBitgoWallet endpoint - with invalid params', () => {
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

it('tests /getBitgoWallet result', async () => {
  const response = await axios.get(PATH, getConfig())

  expect(response.status).toEqual(200)
  expect(response.data).toEqual(
    expect.objectContaining({
      result: expect.objectContaining({
        id: expect.any(String)
      })
    })
  )
})
