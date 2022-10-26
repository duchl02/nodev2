require("dotenv");
const nodemailer = require("nodemailer");


let sendEmail = async (receiverEmail) => {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });
  var mainOptions = {
    from: "duc dep trai",
    to: receiverEmail,
    subject: "gui ",
    text: "cam on ban da nhan email nay ",
    
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
};

module.exports = {
  sendEmail: sendEmail,
};
