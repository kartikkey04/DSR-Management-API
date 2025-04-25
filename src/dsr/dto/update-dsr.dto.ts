import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdateDsrDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  hours?: number;

  @IsOptional()
  @IsDateString()
  date?: Date;
}
