jest.mock('axios')
const { default: axios } = require('axios')
const { CLOUD_FUNCTIONS_PATH } = require('../../../../constants')

const mockedAxios = axios

const PATH = CLOUD_FUNCTIONS_PATH + '/createAddress'

it('tests /createAddress endpoint - wrong method', async () => {
  // Mock a GET request to return status 405
  mockedAxios.get.mockRejectedValue({ response: { status: 405 } })

  await expect(axios.get(PATH)).rejects.toHaveProperty('response.status', 405)
})

it('tests /createAddress result', async () => {
  // Mock a POST request to return the specific response
  mockedAxios.post.mockResolvedValue({
    status: 200,
    data: {
      id: '64d4bbaaa6fd620007020fa662580480',
      address: '0x1922c93f4d2551d7a5807795d4844a0127985d21',
      chain: 0,
      index: 53,
      coin: 'gteth',
      lastNonce: 0,
      wallet: '64b5932d0b26840007c66bda73df2970',
      coinSpecific: {
        nonce: -1,
        updateTime: '2023-08-10T10:27:54.268Z',
        txCount: 0,
        pendingChainInitialization: true,
        creationFailure: [],
        salt: '0x35',
        pendingDeployment: true,
        forwarderVersion: 2
      }
    }
  })

  const response = await axios.post(PATH)

  expect(response.status).toEqual(200)
  expect(response.data).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      address: expect.any(String),
      coin: expect.any(String),
      wallet: expect.any(String)
    })
  )
})
