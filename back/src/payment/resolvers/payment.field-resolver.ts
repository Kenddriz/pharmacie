import { Payment } from '../payment.entity';
import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { PaymentModeService } from '../../payment-mode/payment-mode.service';
import { PaymentMode } from '../../payment-mode/payment-mode.entity';

@Resolver(() => Payment)
export class PaymentFieldResolver {
  constructor(private paymentModeService: PaymentModeService) {}
  @ResolveField(() => PaymentMode)
  async paymentMode(@Root() payment: Payment): Promise<PaymentMode> {
    return await this.paymentModeService.findOneById(payment.paymentModeId);
  }
}
