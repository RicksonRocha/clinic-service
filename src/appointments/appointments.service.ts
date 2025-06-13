import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async create(data: CreateAppointmentInput): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(data);
    return this.appointmentRepository.save(appointment);
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }
    return appointment;
  }

  async update(
    id: number,
    updateAppointmentInput: UpdateAppointmentInput,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    Object.assign(appointment, updateAppointmentInput);
    return this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<Appointment> {
    const appointment = await this.findOne(id);
    return this.appointmentRepository.remove(appointment);
  }
}
