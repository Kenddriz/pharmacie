import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineResolver } from './resolvers/create.medicine.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import {MedicineTypeModule} from '../medicine-type/medicine-type.module';
import {MedicineFieldResolver} from './resolvers/medicine.field-resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine]), MedicineTypeModule],
  providers: [CreateMedicineResolver, MedicineFieldResolver, MedicineService],
})
export class MedicineModule {}
