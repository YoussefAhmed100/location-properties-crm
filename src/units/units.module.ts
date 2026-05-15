import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { UploadService } from 'src/common/storage/upload.service';
import { Project, ProjectSchema } from 'src/projects/schema/project.schema';
import { Unit, UnitSchema } from './schema/unit.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsiteUnitsService } from './website-units.service';

@Module({
  imports: [
        MongooseModule.forFeature([
      { name: Unit.name, schema: UnitSchema },      
      { name: Project.name, schema: ProjectSchema },
   
    ]),
  ],
  controllers: [UnitsController],
  providers: [UnitsService,UploadService,WebsiteUnitsService],
})
export class UnitsModule {}
