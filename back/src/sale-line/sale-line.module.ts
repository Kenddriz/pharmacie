import { Module } from '@nestjs/common';
import { SaleLineService } from './sale-line.service';
import { SaleLineResolver } from './sale-line.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleLine } from './sale-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleLine])],
  providers: [SaleLineResolver, SaleLineService],
})
export class SaleLineModule {}
