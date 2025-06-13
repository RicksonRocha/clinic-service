import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ example: 'Dog' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Canis Lupus' })
  @IsString()
  species: string;

  @ApiProperty({ example: 'SRD' })
  @IsString()
  breed: string;

  @ApiProperty({ example: '2' })
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({ example: '1' })
  @IsInt()
  ownerId: number;
}
