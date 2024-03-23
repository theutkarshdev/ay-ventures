import nodemailer from "nodemailer";
import { configDotenv } from 'dotenv';
configDotenv()
import {
  getInitialEmailsToSend,
  getFollowUp1EmailsToSend,
  getFollowUp2EmailsToSend,
  getInitial2EmailsToSend,
  mailQueueGenerator,
  matchMailQueueUpdater,
} from "../services/emailSchedularService.js";
import {
  initialMailTemplate,
  followUP1MailTemplate,
  followUP2MailTemplate,
  initialMail2Template,
} from "../services/emailTemplate.js";
import { getCurrentDateInFormat } from "../utils/customFunctions.js";



const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
  socketTimeout: 60000,
});



const currentDate = getCurrentDateInFormat();



export default async function sendMail() {
  // Create a transporter object using the default SMTP transport

  try {
    const initialMails = await getInitialEmailsToSend();
    if (initialMails.length > 0) {
      Promise.all(
        initialMails.map(async (email) => {
          // console.log(email)
          const initialMailOptions = {
            from: "test@ayventures.in",
            cc:"test.ayventure@gmail.com",
            to: email.investorId[0].employees[0].email,
            subject: `Investment Opportunity in ${email.startUpId[0].companyName} from AY Ventures`,
            html: await initialMailTemplate(email.investorId[0], email.startUpId[0]),
            headers: {
              "X-Email-Chain-Id": "customtokensend", // Add custom header
            },
          };
          try {
            const initialInfo = await transporter.sendMail(initialMailOptions);
           await mailQueueGenerator(email, "primary mail");
          await  matchMailQueueUpdater({
              emailQueueId: email.emailId,
              lastinitalMail: currentDate,
              primaryEmail: true,
              messageId: initialInfo.messageId,
            });
          } catch (error) {
            console.log(error)
          }
         
        })
      );
    }

    const followUp1Mails = await getFollowUp1EmailsToSend();
    if (followUp1Mails.length > 0) {
      Promise.all(
        followUp1Mails.map(async (email) => {
          const followUpMailOptions = {
            from: "test@ayventures.in",
            cc:"test.ayventure@gmail.com",
            to: email.investorId[0].employees[0].email,
            subject: `Investment Opportunity in ${email.startUpId[0].companyName} from AY Ventures`,
            html: await followUP1MailTemplate(email.investorId[0], email.startUpId[0]),
            references: [email.emailQueue.send.messageIds], // Reference initial email as an array
            "In-Reply-To": email.emailQueue.send.messageIds, // Reply to initial email
            headers: {
              "X-Email-Chain-Id": "customtokensend", // Add custom header
            },
          };
          const followUpInfo = await transporter.sendMail(followUpMailOptions);
          mailQueueGenerator(email, "followUp1");
          matchMailQueueUpdater({
            emailQueueId: email.emailId,
            lastfollowUpMail: currentDate,
            followUpEmail: true,
            messageId: followUpInfo.messageId,
          });
        })
      );
    }

    const followUp2Mails = await getFollowUp2EmailsToSend();
    if (followUp2Mails.length > 0) {
      Promise.all(
        followUp2Mails.map(async (email) => {
          const followUpMailOptions = {
            from: "test@ayventures.in",
            cc:"test.ayventure@gmail.com",
            to: email.investorId[0].employees[0].email,
            subject: `Investment Opportunity in ${email.startUpId[0].companyName} from AY Ventures`,
            html: await followUP2MailTemplate(email.investorId[0], email.startUpId[0]),
            references: [email.emailQueue.send.messageIds], // Reference initial email as an array
            "In-Reply-To": email.emailQueue.send.messageIds, // Reply to initial email
            headers: {
              "X-Email-Chain-Id": "customtokensend", // Add custom header
            },
          };
          const followUpInfo = await transporter.sendMail(followUpMailOptions);
          mailQueueGenerator(email, "followUp2");
          matchMailQueueUpdater({
            emailQueueId: email.emailId,
            lastfollowUpMail: currentDate,
            messageId: followUpInfo.messageId,
          });
        })
      );
    }

    const initial2Mails = await getInitial2EmailsToSend();
    if (initial2Mails.length > 0) {
      Promise.all(
        initial2Mails.map(async (email) => {
          if (email.investorId[0].employees[1]) {
            const initial2MailOptions = {
              from: "test@ayventures.in",
              cc:"test.ayventure@gmail.com",
              to: email.investorId[0].employees[1].email,
              subject: `Investment Opportunity in ${email.startUpId[0].companyName} from AY Ventures`,
              html: await initialMail2Template(email.investorId[0], email.startUpId[0]),
              headers: {
                "X-Email-Chain-Id": "customtokensend", // Add custom header
              },
            };
            const initial2Info = await transporter.sendMail(
              initial2MailOptions
            );
            mailQueueGenerator(email, "primary mail2");
            matchMailQueueUpdater({
              emailQueueId: email.emailId,
              lastinitalMail: currentDate,
              messageId: initial2Info.messageId,
            });
          }
        })
      );
    }
    
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }

  
}
