import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @Field()
  @IsDate()
  date: Date;

  @Field()
  @IsString()
  status: string;

  @Field()
  @IsNumber()
  petId: number;

  @Field()
  @IsNumber()
  ownerId: number;
}
