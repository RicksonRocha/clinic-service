import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity('appointments')
@ObjectType()
export class Appointment {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  date: Date;

  @Column()
  @Field()
  status: string;

  @Column()
  @Field(() => ID)
  petId: number;

  @Column()
  @Field(() => ID)
  ownerId: number;
}
