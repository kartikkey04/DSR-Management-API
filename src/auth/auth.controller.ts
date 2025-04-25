import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { generateOTP } from 'src/utils/otp.util';
import { Redis } from 'ioredis';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('users/api/v1')
export class AuthController {
  constructor(private authService: AuthService,
  @Inject('REDIS_CLIENT') private readonly redis: Redis,
  private readonly mailerService: MailerService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP to email' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  
  async sendOtp(@Body() dto: SendOtpDto) {
  const otp = generateOTP();
  await this.redis.set(`otp:${dto.email}`, otp, 'EX', 300); // expires in 5 minutes

  await this.mailerService.sendOtpEmail(dto.email, otp);

  return { message: 'OTP sent to email' };
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

@Post('forgot-password')
@ApiOperation({ summary: 'Request password reset link' })
@ApiResponse({ status: 200, description: 'Password reset link sent (if email is valid)' })
@Post('forget-password')
async forgetPassword(@Body() dto: ForgetPasswordDto) {
  const user = await this.authService.findByEmail(dto.email);
  if (!user) return { message: 'Email not found' };

  const otp = generateOTP();
  await this.redis.set(`otp:${dto.email}`, otp, 'EX', 300);

  await this.mailerService.sendPasswordResetEmail(dto.email, otp);

  return { message: 'OTP sent to email' };
}

}
