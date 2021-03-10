const nodemailer = require('nodemailer');
require("dotenv").config

console.log(process.env.GMAIL_PASS) 


const sendEmail = async (mailObj) => { 
    const{ from, to, subject, text } = mailObj; 

    try { 
        // Create a transporter 
        let transporter = nodemailer.createTransport({ 
        // service: 'gmail',
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: { 
            user:process.env.GMAIL_USER, 
            pass:process.env.GMAIL_PASS, 
              }, 
        });
    // send mail with defined transport object 
        let info = await transporter.sendMail({ 
            from: from, // sender address 
            to: to, // list of receivers 
            subject: subject, // subject line 
            text: text, // plain text body 
        }); 
        
        console.log(`Message sent: ${info.messageId}`); 
        return`Message sent: ${info.messageId}`; 
    } catch (error) { 
        console.error(error); 
        throw new Error(`Something went wrong in the sendmail method. Error: ${error.message}`); 
    } 
};
        

module.exports = sendEmail; 