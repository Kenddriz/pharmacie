import { Global, Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './resolvers/invoice.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { InvoiceFieldResolver } from './resolvers/invoice.field-resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoiceResolver, InvoiceService, InvoiceFieldResolver],
  exports: [InvoiceService],
})
export class InvoiceModule {}
