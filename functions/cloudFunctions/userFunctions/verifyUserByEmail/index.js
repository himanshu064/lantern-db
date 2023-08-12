const admin = require('firebase-admin')
const {
  cloudFunctionsStartUp,
  validateRequest,
  validateParameters
} = require('../../../helpers/generalHelpers')
const { BASE_URL } = require('../../../config')
const sendEmail = require('../../../utils/sendEmail')

exports.verifyUserByEmail = cloudFunctionsStartUp(async (req, res) => {
  if (!validateRequest(req, 'POST', res)) return
  if (!validateParameters(req.query, ['email'], res)) return

  const { email } = req.query
  const user = await admin.auth().getUserByEmail(email)
  if (!user.uid) return res.status(404).send({ error: 'No user found' })

  const subject = 'Verification'
  const message = `
          <p>Please verify by clicking on the given link below:</p>
            <br />
          <a href="${BASE_URL}/reset-password?email=${user.email}">Click here to be redirected</a>
          `
  sendEmail(user.email, subject, message)
  return res.status(200).send({ message: 'Sent email sucessfully!' })
})
