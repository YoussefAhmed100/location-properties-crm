import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { AboutUsService } from './about-us.service';

import { CreateAboutDto } from './dto/create-about-us.dto';
import { UpdateAboutDto } from './dto/update-about-us.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('About Us')
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutService: AboutUsService) {}

  @Post()
    @ApiOperation({ summary: 'Create About Us page' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(
    @Body()
    createAboutDto: CreateAboutDto,
  ) {
    return this.aboutService.create(createAboutDto);
  }
 @Public()
  @Get()
   @ApiOperation({ summary: 'Get About Us page' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  find() {
    return this.aboutService.findOne();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update About Us page' })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  update(
    @Param('id') id: string,
    @Body()
    updateAboutDto: UpdateAboutDto,
  ) {
    return this.aboutService.update(id, updateAboutDto);
  }


}
