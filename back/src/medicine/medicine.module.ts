import { Global, Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineResolver } from './medicine.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { FormModule } from '../form/form.module';
import { DosageModule } from '../dosage/dosage.module';
import { PackagingModule } from '../packaging/packaging.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Medicine]),
    FormModule,
    DosageModule,
    PackagingModule,
  ],
  providers: [MedicineResolver, MedicineService],
  exports: [MedicineService],
})
export class MedicineModule {}
