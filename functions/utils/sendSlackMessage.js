const { TEST_SLACK_WEBHOOK_ADDRESS } = require('../test-config')
const { API_CALLS } = require('../constants')
const { axiosCall } = require('../helpers/generalHelpers')

const sendSlackMessage = async (message) => {
  const slackMessage = {
    text: message
  }
  try {
    const response = axiosCall(
      API_CALLS.POST,
      TEST_SLACK_WEBHOOK_ADDRESS,
      {},
      {},
      JSON.stringify(slackMessage)
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

module.exports = { sendSlackMessage }
