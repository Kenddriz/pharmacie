import {Module} from '@nestjs/common';
import { MedicineTypeService } from './medicine-type.service';
import { MedicineTypeResolver } from './medicine-type.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineType } from './medicine-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineType])],
  providers: [MedicineTypeResolver, MedicineTypeService],
  exports: [MedicineTypeService]
})
export class MedicineTypeModule {}
