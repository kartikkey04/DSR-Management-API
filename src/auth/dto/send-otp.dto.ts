import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email or phone to receive OTP' })
  @IsEmail()
  email: string;
}
