import { Module } from '@nestjs/common';
import { MedicineFormService } from './medicine-form.service';
import { MedicineFormResolver } from './resolvers/medicine-form.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineForm } from './medicine-form.entity';
import { MedicineFormFieldResolver } from './resolvers/medicine-form.field-resolver';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineForm])],
  providers: [
    MedicineFormResolver,
    MedicineFormFieldResolver,
    MedicineFormService,
  ],
  exports: [MedicineFormService],
})
export class MedicineFormModule {}
