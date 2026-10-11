import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
});


export const sendEmail = async (to: string, subject: string, text: string) => {
    const info = await transporter.sendMail({
        from: process.env.EMAI_USER,
        to: to,
        subject: subject,
        text: text
    });
    return info;
};


// sendEmail(
//     process.env.EMAIL_USER as string,
//     "Nutriveda Test Email",
//     "This is a test email from Nutriveda backend."
// )
// .then(() => {
//     console.log("Email sent successfully");
// })
// .catch((err) => {
//     console.log("Email sending error:", err);
// });