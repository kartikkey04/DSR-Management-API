import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { generateOTP } from 'src/utils/otp.util';
import { Redis } from 'ioredis';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('users/api/v1')
export class AuthController {
  constructor(private authService: AuthService,
  @Inject('REDIS_CLIENT') private readonly redis: Redis
  ) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('send-otp')
  async sendOtp(@Body() dto: SendOtpDto) {
  const otp = generateOTP();
  await this.redis.set(`otp:${dto.email}`, otp, 'EX', 300); // expires in 5 minutes

  console.log(`OTP for ${dto.email}: ${otp}`);

  return { message: 'OTP sent to email (check logs)' };
}

@Post('verify-otp')
async verifyOtp(@Body() dto: VerifyOtpDto) {
  const storedOtp = await this.redis.get(`otp:${dto.email}`);
  if (!storedOtp) return { success: false, message: 'OTP expired' };
  if (storedOtp !== dto.otp) return { success: false, message: 'Invalid OTP' };

  const user = await this.authService.findByEmail(dto.email);
  if (user) {
    user.isVerified = true;
    await user.save();
  }

  await this.redis.del(`otp:${dto.email}`);
  return { success: true, message: 'OTP verified successfully' };
}

}
