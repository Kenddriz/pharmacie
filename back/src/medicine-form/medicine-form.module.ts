import { Module } from '@nestjs/common';
import { MedicineFormService } from './medicine-form.service';
import { MedicineFormResolver } from './medicine-form.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineForm } from './medicine-form.entity';
import { MedicineFormFieldResolver } from './resolvers/medicine-form.field-resolver';
import { UnitModule } from '../unit/unit.module';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineForm]), UnitModule],
  providers: [
    MedicineFormResolver,
    MedicineFormFieldResolver,
    MedicineFormService,
  ],
  exports: [MedicineFormService],
})
export class MedicineFormModule {}
