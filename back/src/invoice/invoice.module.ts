import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoiceResolver, InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
