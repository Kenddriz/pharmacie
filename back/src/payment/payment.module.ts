import { Global, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './resolvers/payment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentModeModule } from '../payment-mode/payment-mode.module';
import { PaymentFieldResolver } from './resolvers/payment.field-resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Payment]), PaymentModeModule],
  providers: [PaymentResolver, PaymentService, PaymentFieldResolver],
  exports: [PaymentService],
})
export class PaymentModule {}
