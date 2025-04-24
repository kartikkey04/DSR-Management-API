import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendOtpEmail(email: string, otp: string) {
    await this.transporter.sendMail({
      from: `"Nest DSR App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp} (valid for 5 minutes)`,
    });
  }

  async sendPasswordResetEmail(email: string, otp: string) {
    await this.transporter.sendMail({
      from: `"Nest DSR App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Reset Password OTP',
      html: `<p>Your password reset OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
  }
}
