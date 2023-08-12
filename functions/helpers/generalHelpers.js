const functions = require('firebase-functions')
const cors = require('cors')
const { default: axios } = require('axios')
const { ACCESS_TOKEN } = require('../config')
const {
  API_CALLS,
  VALID_COINS,
  BALANCE_DIVISIBILITY
} = require('../constants')

const cloudFunctionsStartUp = (handler) => {
  const corsHandler = cors({ origin: true, allowedHeaders: ['*'] })

  return functions.https.onRequest((req, res) =>
    corsHandler(req, res, async () => {
      try {
        await handler(req, res)
      } catch (error) {
        res.status(500).send({ error: error.toString() })
      }
    })
  )
}

const validateRequest = (req, method, res) => {
  if (req.method !== method) {
    res.status(405).send({
      error: `Invalid request method! Please use a ${method} request.`
    })
    return false
  }
  return true
}

const validateParameters = (query, requiredParams, res) => {
  for (const param of requiredParams) {
    if (!query[param]) {
      res.status(400).send({ error: `${param} parameter is required!` })
      return false
    }
  }
  return true
}

const validateCoinParameters = (coin, res) => {
  if (!VALID_COINS.includes(coin)) {
    res.status(400).send({
      error: `Invalid coin! Must be one of: ${VALID_COINS.join(', ')}`
    })
    return false
  }
  return true
}

const getActualBalance = (valueStr = '0') => {
  return parseFloat(valueStr || '0') * BALANCE_DIVISIBILITY
}

const axiosCall = async (
  method,
  path = '',
  params = {},
  headers = {},
  data = {}
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      ...headers
    },
    params: { ...params }
  }
  try {
    let result = null
    switch (method) {
      case API_CALLS.POST:
        result = await axios[method](path, data, config)
        break

      default:
        result = await axios[method](path, config)
        break
    }
    return result.data
  } catch (error) {
    console.dir({ error })
    throw error.toString()
  }
}

module.exports = {
  validateRequest,
  validateParameters,
  validateCoinParameters,
  axiosCall,
  cloudFunctionsStartUp,
  getActualBalance
}
