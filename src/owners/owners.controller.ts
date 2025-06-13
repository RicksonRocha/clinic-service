import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Owners')
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @ApiOperation({ summary: 'Create a new owner' })
  @ApiResponse({ status: 201, description: 'Owner created successfully.' })
  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return await this.ownersService.create(createOwnerDto);
  }

  @ApiOperation({ summary: 'Get all owners' })
  @ApiResponse({ status: 200, description: 'Owners found.' })
  @Get()
  async findAll(): Promise<Owner[]> {
    return await this.ownersService.findAll();
  }

  @ApiOperation({ summary: 'Get owner by id' })
  @ApiResponse({ status: 200, description: 'Owner found.' })
  @ApiParam({ name: 'id', type: Number, description: 'Owner ID' })
  @Get(':id')
  async findOne(@Param('id') id: Owner['id']): Promise<Owner | null> {
    return await this.ownersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a owner' })
  @ApiResponse({ status: 201, description: 'Owner updated successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'Owner ID' })
  @Patch(':id')
  async update(
    @Param('id') id: Owner['id'],
    @Body() updateOwnerDto: UpdateOwnerDto,
  ): Promise<Owner | null> {
    return await this.ownersService.update(+id, updateOwnerDto);
  }

  @ApiOperation({ summary: 'Delete a owner' })
  @ApiResponse({ status: 201, description: 'Owner deleted successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'Owner ID' })
  @Delete(':id')
  async remove(@Param('id') id: Owner['id']) {
    return await this.ownersService.remove(+id);
  }
}
