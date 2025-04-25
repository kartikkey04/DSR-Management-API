import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsNotEmpty()
  name: string;
}
