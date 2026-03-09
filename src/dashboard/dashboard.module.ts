import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { Lead, LeadSchema } from 'src/lead/schema/lead.schema';
import { Deal, DealSchema } from 'src/deals/schema/deal.schema';
import { Project, ProjectSchema } from 'src/projects/schema/project.schema';
import { Client, ClientSchema } from 'src/client/schema/client.schema';
import { Area, AreaSchema } from 'src/areas/schema/area.schema';
import { Unit, UnitSchema } from 'src/units/schema/unit.schema';

@Module({
imports:[
        MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Lead.name, schema: LeadSchema },
      { name: Deal.name, schema: DealSchema },
      { name: Project.name, schema: ProjectSchema },
       { name: Client.name, schema: ClientSchema },
      { name: Area.name, schema: AreaSchema },
       { name: Unit.name, schema: UnitSchema },
    ]),

],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
