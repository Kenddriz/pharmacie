import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { InvoiceModule } from '../invoice/invoice.module';
import { PaymentModeModule } from '../payment-mode/payment-mode.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    PaymentModeModule,
    InvoiceModule,
  ],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
