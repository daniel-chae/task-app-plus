const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "daniel.chae.a@gmail.com",
    subject: "Thanks for joining us!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "daniel.chae.a@gmail.com",
    subject: "Confirmation of account cancellation.",
    text: `Thanks for having used our service, ${name}. It'll be appreciated if you could provide any feedback on why you are cancelling your account.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
};
