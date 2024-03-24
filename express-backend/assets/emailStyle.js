const emailCSS = `/* Base ------------------------------ */
    
  @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
  body {
    width: 100% !important;
    height: 100%;
    margin: 0;
    -webkit-text-size-adjust: none;
  }
  
  a {
    color: #3869D4;
  }
  
  a img {
    border: none;
  }
  
  td {
    word-break: break-word;
  }
  
  .preheader {
    display: none !important;
    visibility: hidden;
    mso-hide: all;
    font-size: 1px;
    line-height: 1px;
    max-height: 0;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
  }
  /* Type ------------------------------ */
  
  body,
  td,
  th {
    font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  }
  
  h1 {
    margin-top: 0;
    color: #333333;
    font-size: 22px;
    font-weight: bold;
    text-align: left;
  }
  
  h2 {
    margin-top: 0;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
  }
  
  h3 {
    margin-top: 0;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
  }
  
  td,
  th {
    font-size: 16px;
  }
  
  p,
  ul,
  ol,
  blockquote {
    margin: .4em 0 1.1875em;
    font-size: 16px;
    line-height: 1.625;
  }
  
  p.sub {
    font-size: 13px;
  }

  /* Buttons ------------------------------ */
  
  .button {
    background-color: #3869D4;
    border-top: 10px solid #3869D4;
    border-right: 18px solid #3869D4;
    border-bottom: 10px solid #3869D4;
    border-left: 18px solid #3869D4;
    display: inline-block;
    color: #FFF;
    text-decoration: none;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
    -webkit-text-size-adjust: none;
    box-sizing: border-box;
  }
  
  .button--green {
    background-color: #22BC66;
    border-top: 10px solid #22BC66;
    border-right: 18px solid #22BC66;
    border-bottom: 10px solid #22BC66;
    border-left: 18px solid #22BC66;
  }
  
  @media only screen and (max-width: 500px) {
    .button {
      width: 100% !important;
      text-align: center !important;
    }
  }

  body {
    background-color: #F2F4F6;
    color: #51545E;
  }
  
  p {
    color: #51545E;
  }
  
  .email-wrapper {
    width: 100%;
    margin: 0;
    padding: 0;
    -premailer-width: 100%;
    -premailer-cellpadding: 0;
    -premailer-cellspacing: 0;
    background-color: #F2F4F6;
  }
  
  .email-content {
    width: 100%;
    margin: 0;
    padding: 0;
    -premailer-width: 100%;
    -premailer-cellpadding: 0;
    -premailer-cellspacing: 0;
  }
  /* Masthead ----------------------- */
  
  .email-masthead {
    padding: 25px 0;
    text-align: center;
  }
  
  .email-masthead_logo {
    width: 94px;
  }
  
  .email-masthead_name {
    font-size: 16px;
    font-weight: bold;
    color: #A8AAAF;
    text-decoration: none;
    text-shadow: 0 1px 0 white;
  }
  /* Body ------------------------------ */
  
  .email-body {
    width: 100%;
    margin: 0;
    padding: 0;
    -premailer-width: 100%;
    -premailer-cellpadding: 0;
    -premailer-cellspacing: 0;
  }
  
  .email-body_inner {
    width: 570px;
    margin: 0 auto;
    padding: 0;
    -premailer-width: 570px;
    -premailer-cellpadding: 0;
    -premailer-cellspacing: 0;
    background-color: #FFFFFF;
  }
  
  .email-footer {
    width: 570px;
    margin: 0 auto;
    padding: 0;
    -premailer-width: 570px;
    -premailer-cellpadding: 0;
    -premailer-cellspacing: 0;
    text-align: center;
  }
  
  .email-footer p {
    color: #A8AAAF;
  }
  
  .body-action {
    width: 100%;
    margin: 30px auto;
    padding: 0;
    -premailer-width: 100%;
    -premailer-cellpadding: 0;
    -premailer-cellspacing: 0;
    text-align: center;
  }
  
  .body-sub {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid #EAEAEC;
  }
  
  .content-cell {
    padding: 45px;
  }
  /*Media Queries ------------------------------ */
  
  @media only screen and (max-width: 600px) {
    .email-body_inner,
    .email-footer {
      width: 100% !important;
    }
  }
  
  @media (prefers-color-scheme: dark) {
    body,
    .email-body,
    .email-body_inner,
    .email-content,
    .email-wrapper,
    .email-masthead,
    .email-footer {
      background-color: #333333 !important;
      color: #FFF !important;
    }
    p,
    ul,
    ol,
    blockquote,
    h1,
    h2,
    h3,
    span,
    .purchase_item {
      color: #FFF !important;
    }

    .email-masthead_name {
      text-shadow: none !important;
    }
  }
  
  :root {
    color-scheme: light dark;
    supported-color-schemes: light dark;
  }`

module.exports = emailCSS