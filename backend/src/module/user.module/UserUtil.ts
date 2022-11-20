const nodemailer = require("nodemailer");

export async function main() {

    let transporter = nodemailer.createTransport({
        service:'Zoho',
        host: "smtp.zoho.in",
        port: 465,
        secure: true, 
        auth: {
            user: "nknittin16436@zohomail.in", 
            pass: "Abcd1234$AUTODESK",
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Nand kumar" <nknittin16436@zoho.com>',
        to: "nknittin16436@gmail.com, baz@example.com", 
        subject: "Hello ✔", 
        text: "Password reset succesfully", 
        html: "<b>Password reset succesfully</b>", 
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
