import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionResolver } from './prescription.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './prescription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription])],
  providers: [PrescriptionResolver, PrescriptionService],
  exports: [PrescriptionService],
})
export class PrescriptionModule {}
