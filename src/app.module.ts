import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnersModule } from './owners/owners.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owners/entities/owner.entity';
import { PetsModule } from './pets/pets.module';
import { Pet } from './pets/entities/pet.entity';
import { AppointmentsModule } from './appointments/appointments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Appointment } from './appointments/entities/appointment.entity';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'vet_clinic',
      entities: [Owner, Pet, Appointment],
      synchronize: true, // só em dev para criar tabelas automaticamente
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      sortSchema: true,
      context: ({ req }: { req: Request }) => ({ req }),
    }),

    OwnersModule,
    PetsModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
