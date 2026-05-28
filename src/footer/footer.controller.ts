import {
  Controller,
  Get,

} from '@nestjs/common';
import { FooterService } from './footer.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Public()
@ApiTags('Footer')
@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

   @Get()
    @ApiOperation({
       summary:
         'Get footer data',
     })
   
    async getFooterData() {
      return this.footerService.getFooterData();
    }
}
