import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwnerDto);
    return await this.ownerRepository.save(owner);
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownerRepository.find();
  }

  async findOne(id: Owner['id']): Promise<Owner | null> {
    const owner = await this.ownerRepository.findOneBy({ id });

    if (!owner) {
      throw new NotFoundException(`Owner with id ${id} not found`);
    }
    return owner;
  }

  async update(id: Owner['id'], updateOwnerDto: UpdateOwnerDto) {
    await this.ownerRepository.update(id, updateOwnerDto);
    return await this.ownerRepository.findOneBy({ id });
  }

  async remove(id: Owner['id']) {
    return await this.ownerRepository.delete(id);
  }
}
