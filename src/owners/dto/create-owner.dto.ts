import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123-456-7890', required: false })
  @IsPhoneNumber(undefined)
  @IsOptional()
  phone?: string;
}
