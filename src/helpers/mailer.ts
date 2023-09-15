import nodemailer from "nodemailer";

export const sendMail = async ({  reciverEmail, message, senderMail}: any) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "decc5f494ef1b3",
        pass: "e8a5ab9bbe7f28",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: reciverEmail,
      subject:senderMail+' Is inviting you to have a conversation',
      html: `<p>${message} ....Click on the link to login <a href='${process.env.URL}/login'>Login </a> or If the link is not working visit ${process.env.NEXTAUTH_URL}/login`
          ,
    };
    const mail = await transport.sendMail(mailOptions);
 
    return mail;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
