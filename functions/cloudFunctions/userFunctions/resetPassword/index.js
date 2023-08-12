const admin = require('firebase-admin')
const {
  cloudFunctionsStartUp,
  validateRequest,
  validateParameters
} = require('../../../helpers/generalHelpers')

exports.resetPassword = cloudFunctionsStartUp(async (req, res) => {
  if (!validateRequest(req, 'PUT', res)) return
  if (!validateParameters(req.query, ['email', 'newPassword'], res)) return

  const { email, newPassword } = req.query

  const user = await admin.auth().getUserByEmail(email)
  if (!user.uid) return res.status(404).send({ error: 'No user found' })

  await admin.auth().updateUser(user.uid, {
    password: newPassword
  })
  return res.status(200).send({ message: 'Password reset successfully' })
})
