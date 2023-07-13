import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'services.Infinix.ecom@gmail.com',
    pass: 'ijhmhxamsfucrvhf'
  }
});

const sendEmailOtp = async (toEmail, otp) => {
  try {
    const mailOptions = {
      from: 'services.Infinix.ecom@gmail.com',
      to: toEmail,
      subject: 'OTP Verification',
      text: `Your OTP is ${otp}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully:', result.messageId);
  } catch (error) {
    console.error('Failed to send OTP:', error);
  }
};

sendEmailOtp('lokeshd0506@gmail.com',"676767");