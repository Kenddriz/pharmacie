import { Module } from '@nestjs/common';
import { PaymentModeService } from './payment-mode.service';
import { PaymentModeResolver } from './payment-mode.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMode } from './payment-mode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMode])],
  providers: [PaymentModeResolver, PaymentModeService],
  exports: [PaymentModeService],
})
export class PaymentModeModule {}
