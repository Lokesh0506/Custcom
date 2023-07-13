import React, { useState } from 'react';
import nodemailer from 'nodemailer';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);


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

  const generateOtp = () => {
    // Generate a random 6-digit OTP
    const randomOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(randomOtp.toString());
    setIsOtpSent(true);

    // Send the OTP via email
    sendEmailOtp(email, randomOtp);
  };

  const handleSignup = () => {
    // Perform signup logic here
    if (isOtpSent) {
      console.log('Signup successful!');
      // Reset form after successful signup
      setName('');
      setEmail('');
      setOtp('');
      setIsOtpSent(false);
    } else {
      console.log('Please generate OTP first.');
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email Address:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {!isOtpSent && (
        <button onClick={generateOtp}>Generate OTP</button>
      )}
      {isOtpSent && (
        <div>
          <label>Enter OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
        </div>
      )}
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
