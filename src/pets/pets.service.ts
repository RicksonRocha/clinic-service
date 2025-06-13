import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { Owner } from '../owners/entities/owner.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
    @InjectRepository(Owner)
    private readonly ownersRepository: Repository<Owner>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const owner = await this.ownersRepository.findOneBy({
      id: createPetDto.ownerId,
    });
    if (!owner) throw new NotFoundException('Owner not found');

    const pet = this.petsRepository.create({ ...createPetDto, owner });
    return this.petsRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find({ relations: ['owner'] });
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);
    Object.assign(pet, updatePetDto);
    return this.petsRepository.save(pet);
  }

  async remove(id: number): Promise<Pet> {
    const pet = await this.findOne(id);
    return this.petsRepository.remove(pet);
  }
}
