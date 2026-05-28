import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/roles.enum';

@ApiTags('Contact Us')
@Controller('contact')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create contact us info' })
  @ApiBody({ type: CreateContactUsDto })
  @ApiResponse({ status: 201, description: 'Contact created successfully' })
  create(@Body() dto: CreateContactUsDto) {
    return this.contactUsService.create(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get contact us info' })
  @ApiResponse({ status: 200, description: 'Return contact info' })
  findOne() {
    return this.contactUsService.findOne();
  }

  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update contact us info' })
  @ApiParam({
    name: 'id',
    description: 'Contact document ID',
    example: '65f1c2a9b1a2c3d4e5f67890',
  })
  @ApiBody({ type: UpdateContactUsDto })
  @ApiResponse({ status: 200, description: 'Contact updated successfully' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateContactUsDto,
  ) {
    return this.contactUsService.update(id, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact us info' })
  @ApiParam({
    name: 'id',
    description: 'Contact document ID',
    example: '65f1c2a9b1a2c3d4e5f67890',
  })
  @ApiResponse({ status: 200, description: 'Contact deleted successfully' })
  remove(@Param('id') id: string) {
    return this.contactUsService.remove(id);
  }
}