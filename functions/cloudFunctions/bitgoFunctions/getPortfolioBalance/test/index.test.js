const { default: axios } = require('axios')
const { CLOUD_FUNCTIONS_PATH } = require('../../../../constants')

const PATH = CLOUD_FUNCTIONS_PATH + '/getPortfolioBalance'

it('tests /getPortfolioBalance endpoint - wrong method', () => {
  return expect(axios.post(PATH)).rejects.toHaveProperty(
    'response.status',
    405
  )
})

it('tests /getPortfolioBalance result', async () => {
  const response = await axios.get(PATH)

  expect(response.status).toEqual(200)
  expect(response.data).toEqual(
    expect.objectContaining({
      result: expect.arrayContaining([
        expect.objectContaining({
          symbol: expect.any(String)
        })
      ])
    })
  )
})
