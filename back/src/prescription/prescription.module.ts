import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionResolver } from './prescription.resolver';

@Module({
  providers: [PrescriptionResolver, PrescriptionService]
})
export class PrescriptionModule {}
