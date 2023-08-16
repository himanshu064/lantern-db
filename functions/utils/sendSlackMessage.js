const { TEST_SLACK_WEBHOOK_ADDRESS } = require('../test-config');
const { API_CALLS } = require('../constants');
const { axiosCall } = require('../helpers/generalHelpers');

const sendSlackMessage = async (message) => {
  const slackMessage = {
    text: message,
  };
  try {
    await axiosCall(
      API_CALLS.POST,
      TEST_SLACK_WEBHOOK_ADDRESS,
      {},
      {},
      JSON.stringify(slackMessage)
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendSlackMessage };
