import nodemailer from "nodemailer";
import dotenv from "dotenv";
import SMTPTransport from "nodemailer/lib/smtp-transport"; // Import SMTPTransport for type casting

dotenv.config();

// Nodemailer email sending logic
const sendEmail = async (emailData: { to: string, subject: string, body: string }) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    }
  } as SMTPTransport.Options); 

  try {
    const email = await transporter.sendMail({
      from: '"Maddison Foo Koch " <maddison53@ethereal.email>', // sender address
      to: emailData.to, // use the emailData.to field
      subject: emailData.subject, // use the emailData.subject field
      text: emailData.body, // plain text body
      html: `<b>${emailData.body}</b>`, // html body
    });
    return email.accepted;
  } catch (error) {
    console.log(error);
  }
};

export { sendEmail };
