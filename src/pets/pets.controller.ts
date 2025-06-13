import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiOperation({ summary: 'Create a new pet' })
  @ApiResponse({ status: 201, description: 'Pet created successfully.' })
  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @ApiOperation({ summary: 'Get all pets' })
  @ApiResponse({ status: 201, description: 'Pets found successfully.' })
  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @ApiOperation({ summary: 'Get pet by id' })
  @ApiResponse({ status: 201, description: 'Pet found successfully.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a pet' })
  @ApiResponse({ status: 201, description: 'Pet updated successfully.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }

  @ApiOperation({ summary: 'Delete a pet' })
  @ApiResponse({ status: 201, description: 'Pet deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
