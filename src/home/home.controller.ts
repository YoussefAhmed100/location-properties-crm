import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { HomeService } from './home.service';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Home')
@Public()
@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      'Get home page data',
  })
  @ApiResponse({
    status: 200,
    description:
      'Home page data fetched successfully',
  })
  async getHomePageData() {
    return await this.homeService.getHomePageData();
  }
}