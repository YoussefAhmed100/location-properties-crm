import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiBearerAuth,

} from '@nestjs/swagger';

import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { buildQueryDto } from 'src/common/dto/base-query.dto';

import { Roles } from 'src/common/decorators/roles.decorator';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UserRole } from 'src/users/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';


@ApiTags('Developers')
@ApiBearerAuth() 
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.SALES)
@Controller('developers')

export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @ApiOperation({ summary: 'Create developer' })
  @ApiCreatedResponse({ description: 'Developer created successfully' })
  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developersService.create(createDeveloperDto);
  }

  @ApiOperation({ summary: 'Get all developers' })
  @ApiOkResponse({ description: 'Return developers list' })
  @Public()
  @Get()
  findAll(@Query() query: buildQueryDto) {
    return this.developersService.findAll(query);
  }

  @ApiOperation({ summary: 'Get developers dashboard summary' })
  @ApiOkResponse({ description: 'Return dashboard summary' })
  @Get('summary')
  async getDashboardSummary() {
    return this.developersService.getDeveloperDashboardSummary();
  }

  @ApiOperation({ summary: 'Get single developer dashboard summary' })
  @ApiParam({ name: 'id', description: 'Developer ID' })
  @ApiOkResponse({ description: 'Return developer summary' })
  @Get(':id/summary')
  async getDeveloperSummary(@Param('id',ParseObjectIdPipe) id: string) {
    return this.developersService.getoneDeveloperDashboardSummary(id);
  }

    @ApiOperation({ summary: 'Get all projects that belong to specific developer' })
    @ApiOkResponse({ description: 'Return all projects' })
    @Get(':developerId/allProjects')
    getProjectUnits(
    @Param('developerId') developerId: string,
    @Query() query: buildQueryDto,
  ) {
    return this.developersService.getDeveloperProjects(developerId, query);
  }

  @ApiOperation({ summary: 'Get developer by id' })
  @ApiParam({ name: 'id', description: 'Developer ID' })
  @ApiOkResponse({ description: 'Return developer data' })
  @Get(':id')
  findOne(@Param('id',ParseObjectIdPipe) id: string) {
    return this.developersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update developer' })
  @ApiParam({ name: 'id', description: 'Developer ID' })
  @ApiOkResponse({ description: 'Developer updated successfully' })
  @Patch(':id')
  update(
    @Param('id',ParseObjectIdPipe) id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.developersService.update(id, updateDeveloperDto);
  }

  @ApiOperation({ summary: 'Delete developer' })
  @ApiParam({ name: 'id', description: 'Developer ID' })
  @ApiOkResponse({ description: 'Developer deleted successfully' })
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Delete(':id')
  delete(@Param('id',ParseObjectIdPipe) id: string) {
    return this.developersService.remove(id);
  }
}