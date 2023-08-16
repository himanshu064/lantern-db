const { BITGO_PATH, API_CALLS } = require('../../../constants');
const {
  cloudFunctionsStartUp,
  formatDateInUS,
} = require('../../../helpers/generalHelpers');
const { axiosCall } = require('../../../helpers/generalHelpers');
const { sendSlackMessage } = require('../../../utils/sendSlackMessage');

exports.getBitgoSlackWalletNotification = cloudFunctionsStartUp(
  async (req, res) => {
    try {
      // This code is for sending the slack message when the transfer is confirmed
      // const { coin, wallet, transfer, state } = req.body;
      // const path = `${BITGO_PATH}/api/v2/${coin}/wallet/${wallet}/transfer/${transfer}`;
      // if (state === 'confirmed') {
      //   const result = await axiosCall(API_CALLS.GET, path);
      //   const { usd, wallet, date } = result;
      //   const transferDate = formatDateInUS(date);
      //   const slackMessage = `Amount transfered :$${usd} \n Wallet Id :- ${wallet} \n Date :- ${transferDate}`;
      //   await sendSlackMessage(slackMessage);
      //   res.send({ response: slackMessage });
      // } else {
      //   const slackMessage = `Amount is not trasfered to WalletId :- ${wallet} \n coin :- ${coin} \n Transfer Id :- ${transfer} \n status : ${state}`;
      //   await sendSlackMessage(slackMessage);
      //   res.send({ response: slackMessage });
      // }
      const { coin, wallet, transfer, state } = req.body;
      const path = `${BITGO_PATH}/api/v2/${coin}/wallet/${wallet}/transfer/${transfer}`;

      // Fetch transfer details from the API
      const result = await axiosCall(API_CALLS.GET, path);
      const { usd, date } = result;

      // Format the transfer date
      const transferDate = formatDateInUS(date);

      // Compose Slack message with transfer details and status
      const slackMessage = `Amount transferred: $${usd}\nWallet Id: ${wallet}\nDate: ${transferDate}\nStatus: ${state}`;

      // Send the Slack message
      await sendSlackMessage(slackMessage);

      res.send({ response: slackMessage });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'An error occurred' }); // Adjust the response status and message as needed
    }
  }
);
