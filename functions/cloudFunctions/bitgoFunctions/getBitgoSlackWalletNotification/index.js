const { BITGO_PATH, API_CALLS } = require('../../../constants');
const { WALLET_ID } = require('../../../test-config');
const {
  cloudFunctionsStartUp,
  validateRequest,
  validateParameters,
  validateCoinParameters,
  axiosCall,
} = require('../../../helpers/generalHelpers');

const { sendSlackMessage } = require('../../../utils/sendSlackMessage');

// const BitGo = require('bitgo')
// const bitgo = new BitGo({ env: 'test' })

// const accessToken = 'V2x41886dbf6456e2eec76e213a686daa23f7861f73ac661c863e5add00d7136252'
// const network = 'gteth'
// const callbackUrl = 'https://us-central1-lantern-33dfd.cloudfunctions.net/notifySlackMessage'
// const type = 'wallet_confirmation'
// const label = 'My Webhook'
// const numConfirmations = 0

exports.getBitgoSlackWalletNotification = cloudFunctionsStartUp(
  async (req, res) => {
    // if (!validateRequest(req, 'POST', res)) return
    // if (!validateParameters(req.body, ['coin', 'amount'], res)) return;
    // const { coin: coinParam, amount } = req.body;
    // if (!validateCoinParameters(coinParam, res)) return
    // const path = `${BITGO_PATH}/api/v2/gteth/wallet/64c97c0e92f9ae00077d613441123e14/webhooks`
    // const walletPayload = {
    //   type: 'transfer',
    //   allToken: false,
    //   url: 'https://us-central1-lantern-33dfd.cloudfunctions.net/notifySlackMessage',
    //   label: 'My Webhook',
    //   numConfirmations: 6,
    //   listenToFailureStates: true
    // }
    // const result = await axiosCall(API_CALLS.GET, path, {}, {
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer V2x41886dbf6456e2eec76e213a686daa23f7861f73ac661c863e5add00d7136252'
    // }, walletPayload)
    // console.log('Called', result)
    // if (result) {
    //   const slackMessage = 'Amount 100 added to wallet'
    //   await sendSlackMessage(slackMessage)
    //   res.send({ result })
    // }
    // res.send({ result })

    // if (!validateRequest(req, 'GET', res)) return;

    // try {
    //   const path = `${BITGO_PATH}/api/v2/gteth/wallet/${WALLET_ID}`;
    //   const result = await axiosCall(API_CALLS.GET, path); // Assuming axiosCall is defined somewhere
    //   console.log('API Call Result:', result);

    //   if (result) {
    //     const slackResponse = await sendSlackMessage('Some demo message');
    //     console.log('Slack Response:', slackResponse);
    //     res.send({ response: slackResponse });
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   res.status(500).send({ error: 'An error occurred' }); // Adjust the response status and message as needed
    // }
    // if (!validateRequest(req, 'GET', res)) return;
    try {
      // You can directly send the Slack message here
      await sendSlackMessage('Some demo message');
      res.send({ response: 'Slack messge send successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'An error occurred' }); // Adjust the response status and message as needed
    }
  }
);
