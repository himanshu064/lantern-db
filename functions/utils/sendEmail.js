const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const CONFIG_OBJ = require('../config')

const OAuth2 = google.auth.OAuth2

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, EMAIL_PROVIDER } = CONFIG_OBJ

const oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
})

const accessToken = oauth2Client.getAccessToken()

// Configure the Gmail SMTP transport
const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: EMAIL_PROVIDER,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken
  }
})

const sendEmail = (to, subject, htmlContent) => {
  const mailOptions = {
    from: EMAIL_PROVIDER,
    to,
    subject,
    generateTextFromHTML: true,
    html: htmlContent
  }

  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response)
    smtpTransport.close()
  })
}

module.exports = sendEmail
