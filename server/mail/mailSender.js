import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});
export default async function sendMail() {
  // Create a transporter object using the default SMTP transport

  async function sendEmailChainWithCustomIdentifier(customIdentifier) {
    try {
      // Send initial email with custom identifier
      const initialMailOptions = {
        to: 'tkb8059@gmail.com',
        subject: 'email for statrtups 1',
        html: '<p>This is the initial email with a custom identifier.</p>',
        headers: {
          'X-Email-Chain-Id': customIdentifier, // Add custom header
        },
      };

      const initialInfo = await transporter.sendMail(initialMailOptions);
      console.log('Initial email sent with custom identifier:', initialInfo.messageId);
      
      // Send follow-up email (with references)
      const followUpMailOptions = {
        to: 'tkb8059@gmail.com',
        subject: 'email for statrtups 1',
        html: '<p>This is a follow-up email.</p>',
        references: [initialInfo.messageId], // Reference initial email as an array
        'In-Reply-To': initialInfo.messageId, // Reply to initial email
        headers: {
          'X-Email-Chain-Id': customIdentifier, // Add custom header
        },
      };

      const followUpInfo = await transporter.sendMail(followUpMailOptions);
      console.log('Follow-up email sent with references:', followUpInfo.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  // Call the function to send the email chain with custom identifier
  await sendEmailChainWithCustomIdentifier('123456789');

}

