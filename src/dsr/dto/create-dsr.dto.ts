import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateDsrDto {
 @ApiProperty({ example: 'Implemented auth module' })
  @IsString()
  content: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  hours: number;

  @ApiProperty({ example: '2025-04-25' })
  @IsDate()
  date: Date;
}
