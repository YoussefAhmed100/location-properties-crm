import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Unit, UnitSchema } from 'src/units/schema/unit.schema';
import { Deal, DealSchema } from './schema/deal.schema';

@Module({
  imports: [
         MongooseModule.forFeature([
          {name:Deal.name,schema:DealSchema},
          { name: Unit.name, schema: UnitSchema },  
         ])    
         
  ],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
