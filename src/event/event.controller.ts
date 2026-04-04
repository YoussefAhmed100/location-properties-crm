import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  
} from '@nestjs/common';

import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { buildQueryDto } from 'src/common/dto/base-query.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';

@ApiTags('Events')
@ApiBearerAuth() 
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.SALES)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create new event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all events with filtering & pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'keyword', required: false, example: 'meeting' })
  @ApiResponse({ status: 200, description: 'Events fetched successfully' })
  findAll(@Query() query: buildQueryDto) {
    return this.eventService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiParam({
    name: 'id',
    description: 'Event ID',
    example: '65f7c3c4a1b2c3d4e5f67890',
  })
  @ApiResponse({ status: 200, description: 'Event fetched successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update event by ID' })
  @ApiParam({
    name: 'id',
    description: 'Event ID',
    example: '65f7c3c4a1b2c3d4e5f67890',
  })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  
  @ApiOperation({ summary: 'Delete event by ID' })
  @ApiParam({
    name: 'id',
    description: 'Event ID',
    example: '65f7c3c4a1b2c3d4e5f67890',
  })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
   @ApiResponse({ status: 404, description: 'Event not found' })
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.eventService.remove(id);
  }
}