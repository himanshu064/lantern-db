const { cloudFunctionsStartUp } = require('../../../helpers/generalHelpers');

const { sendSlackMessage } = require('../../../utils/sendSlackMessage');

exports.getBitgoSlackWalletNotification = cloudFunctionsStartUp(
  async (req, res) => {
    try {
      console.log(res, 'response');
      console.log(req, 'request');
      console.log('Request Body:', req.body);
      const { coin, wallet, transfer, state } = req.body;
      // You can directly send the Slack message here
      const slackMessage = `Amount is trasfered to walletId :- ${wallet} \n coin :- ${coin} \n Transfer Id :- ${transfer} \n status : ${state}`;
      await sendSlackMessage(slackMessage);
      res.send({ response: slackMessage });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'An error occurred' }); // Adjust the response status and message as needed
    }
  }
);
