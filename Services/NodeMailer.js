import nodemailer from 'nodemailer';


export async function SendEmail(to,subject,html){
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.MAILEREMAIL,
    pass: process.env.MAILERPASS,
  },
});

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Exoteryx Email Confirmation System" <ramezsalhab@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
}
