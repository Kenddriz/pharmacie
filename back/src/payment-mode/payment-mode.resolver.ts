import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentModeService } from './payment-mode.service';
import { PaymentMode } from './payment-mode.entity';
import { UpdatePaymentModeInput } from './types/payment-mode.input';

@Resolver(() => PaymentMode)
export class PaymentModeResolver {
  constructor(private readonly paymentModeService: PaymentModeService) {}

  @Mutation(() => PaymentMode)
  async updatePaymentMode(@Args('input') input: UpdatePaymentModeInput) {
    const paymentMode = await this.paymentModeService.findOneById(input.id);
    Object.assign<PaymentMode, UpdatePaymentModeInput>(paymentMode, input);
    return await this.paymentModeService.save(paymentMode);
  }
}
