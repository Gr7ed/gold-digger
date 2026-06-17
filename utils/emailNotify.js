import nodemailer from 'nodemailer'

export async function emailNotify(purchaseData) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com', // e.g., smtp-mail.outlook.com for Microsoft
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'your_email@gmail.com', // Your personal email
        pass: process.env.SMTP_PASS || 'your_16_char_app_password' // Your App Password
      }
    })

    await transporter.sendMail({
      from: `"GoldDigger" <${process.env.SMTP_USER || 'your_email@gmail.com'}>`,
      to: '"Customer" <customer@example.com>',
      subject: "Your Gold Purchase Confirmation",
      text: `Thank you! You purchased ${purchaseData.goldSold} oz of gold for £${purchaseData.amountPaid}. Transaction ID: ${purchaseData.uuid}`
    })

    console.log(`[Email Notify] Successfully sent email confirmation for ${purchaseData.uuid}`)
  } catch (err) {
    console.error('[Email Notify] Error sending email:', err)
  }
}