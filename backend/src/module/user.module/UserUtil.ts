const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service:'Zoho',
        host: "smtp.zoho.in",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "nknittin16436@zohomail.in", // generated ethereal user
            pass: "Abcd1234$AUTODESK", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Nand kumar" <nknittin16436@zoho.com>', // sender address
        to: "nknittin16436@gmail.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}