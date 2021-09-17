import { Global, Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleResolver } from './sale.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { PrescriptionModule } from '../prescription/prescription.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Sale]), PrescriptionModule],
  providers: [SaleResolver, SaleService],
  exports: [SaleService],
})
export class SaleModule {}
