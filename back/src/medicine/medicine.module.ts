import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineResolver } from './resolvers/create.medicine.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { FormModule } from '../form/form.module';
import { MedicineFieldResolver } from './resolvers/medicine.field-resolver';
import { MedicineFormModule } from '../medicine-form/medicine-form.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicine]),
    FormModule,
    MedicineFormModule,
  ],
  providers: [CreateMedicineResolver, MedicineFieldResolver, MedicineService],
})
export class MedicineModule {}
