// html taken from  Postmark Template 
// https://postmarkapp.com/transactional-email-templates/reset-password


const emailCSS = require('../assets/emailStyle')
const encryptValue = require('./encryptValue')

const generateResetEmail = async (first_name, last_name, os, browser, token) => {
  const githubRepo = process.env.GITHUB_REPO
  const homepage = process.env.FRONTEND_URL
  const support_url = process.env.SUPPORT_URL



  let encryptedtoken = encryptValue(`${token}`)

  const action_url = `${homepage}/resetpassword?token=${encryptedtoken}`
  // let support_url = 'https://docs.google.com/forms/d/e/1FAIpQLSd2kXklBMo1EF6e2o9oqSZwB2QXminWNEQEXmvvfZsvxMKKnQ/viewform'
  //css
  // head
  const head = `
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta name='x-apple-disable-message-reformatting' />
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
    <title></title>
    <style>${emailCSS}</style>
    <meta name='color-scheme' content='light dark' />
    <meta name='supported-color-schemes' content='light dark' />
  `

  //body
  const bodyTEMP = `<span class='preheader'>Use this link to reset your password. The link is only valid for 24 hours.</span>
    <table class='email-wrapper' width='100%' cellpadding='0' cellspacing='0' role='presentation'>
      <tr>
        <td align='center'>
          <table class='email-content' width='100%' cellpadding='0' cellspacing='0' role='presentation'>
            <tr>
              <td class='email-masthead'>
                <a href='${homepage}' class='f-fallback email-masthead_name'>
                  Master's Fantasy Golf
                </a>
              </td>
            </tr>
            <!-- Email Body -->
            <tr>
              <td class='email-body' width='570' cellpadding='0' cellspacing='0'>
                <table class='email-body_inner' align='center' width='570' cellpadding='0' cellspacing='0' role='presentation'>
                  <!-- Body content -->
                  <tr>
                    <td class='content-cell'>
                      <div class='f-fallback'>
                        <h1>Hi ${first_name} ${last_name},</h1>
                        <p>You recently requested to reset your password for your Master's Fantasy Golf account. Use the button below to reset it. <strong>This password reset is only valid for the next 1 hours.</strong></p>
                        <!-- Action -->
                        <table class='body-action' align='center' width='100%' cellpadding='0' cellspacing='0' role='presentation'>
                          <tr>
                            <td align='center'>
                              <!-- Border based button https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                              <table width='100%' border='0' cellspacing='0' cellpadding='0' role='presentation'>
                                <tr>
                                  <td align='center'>
                                    <a href='${action_url}' class='f-fallback button button--green' target='_blank'>Reset your password</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <p>For security, this request was received from a ${os} device using ${browser}. If you did not request a password reset, please ignore this email or <a href='${support_url}'>contact support</a> if you have questions.</p>
                        <p>Thanks,
                          <br>The Master's Fantasy Golf team
                        </p>
                        <!-- Sub copy -->
                        <table class='body-sub' role='presentation'>
                          <tr>
                            <td>
                              <p class='f-fallback sub'>If you're having trouble with the button above, copy and paste the URL below into your web browser.</p>
                              <p class='f-fallback sub'>${action_url}</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class='email-footer' align='center' width='570' cellpadding='0' cellspacing='0' role='presentation'>
            <tr>
              <td class='content-cell' align='center'>
                <p class='f-fallback sub align-center'>
                  Masters Fantasy Golf
                  <br><a href='${homepage}' class='f-fallback email-masthead_name'>Home Page</a>
                  <br><a href='${githubRepo}' class='f-fallback email-masthead_name'>Github Repostitory</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>'`

  // full html
  const html = `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
  <head>
    ${head}
  </head>
  <body>
    ${bodyTEMP}
  </body>
</html>`

return html
}

module.exports = generateResetEmail