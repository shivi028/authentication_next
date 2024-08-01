import nodemailer from 'nodemailer'
import User from '@/models/user.model';
import bcryptjs from 'bcryptjs'
// interface mailProps{
//    email: string,
//    emailType: string,
//    userId: string
// }

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if(emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken}, {verifyTokenExpiry: Date.now() + 3600000})
        }
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {forgetPasswordToken: hashedToken}, {forgetPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "468378ec875c17",
              pass: "a6f0974726b650"
            }
          });

          const mailOptions ={
            from: 'tiwarishivi028@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY'? 'verify your email': 'Reset your Password', // Subject line
            html: `<p>click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to ${emailType === 'VERIFY' ? 'verify your password' : 'reset your password'} or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`, // html body
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
        
    } catch (error : any) {
        throw new Error(error.message)
    }
}