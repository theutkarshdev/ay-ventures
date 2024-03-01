import cron from "node-cron";
import nodemailer from "nodemailer";


async function sendMail() {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "utkarsh.uitest@gmail.com",
      pass: "jndbcnmrtjhqohzx",
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"AY Ventures" <no-reply@ayventures.in>', // sender address
    to: "utkarshk495@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

export function startCronJob() {
  cron.schedule('0 * * * *', async () => {
    try {
      await sendMail();
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });

  cron.schedule("0 1 * * *", () => {
    sendMail();
  });
}
