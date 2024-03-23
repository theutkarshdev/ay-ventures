import MailListener from 'mail-listener2';
import chalk from 'chalk';
import { configDotenv } from 'dotenv';
configDotenv()

// Set up an email listener
const emailListener = new MailListener({
  username: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
  host: "imappro.zoho.in",
  port: 993, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN"], // fetch unseen emails
  markSeen: false, // keep emails as unseen
  fetchUnreadOnStart: true, // fetch all unseen emails on start
  mailParserOptions: { streamAttachments: true }, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

export const mailListner = () => {
  // Start the email listener
  emailListener.start();

  emailListener.on('mail', async (mail, seqno, attributes) => {
    try {
      const parsedEmail = mail;

      // console.log(('Received email:', parsedEmail));
      console.log(chalk.red('Received email:', seqno));
      console.log('Received email:', attributes);
      await new Promise(resolve => setTimeout(() => console.log("timeout"), 5000));
      emailListener.imap.setFlags([seqno], ["\\Seen"]);
      console.log("set flag");
      // Check if the email has the X-Email-Chain-Id header
      const chainId = parsedEmail.headers['x-email-chain-id'];

      // Check if the email has the References header
      const references = parsedEmail.references;

      // Check if the email has the In-Reply-To header
      const inReplyTo = parsedEmail.inReplyTo;

      if (chainId || references || inReplyTo) {
        console.log('User responded to an existing email chain');
        console.log('Custom Identifier:', chainId);
        console.log('References:', references);
        console.log('In-Reply-To:', inReplyTo);

        // Perform any additional logic based on the identified email chain
      } else {
        console.log('This is a new email (not a response to an existing chain)');
      }
    } catch (error) {
      console.error('Error parsing email:', error);
    }
  });
 
};