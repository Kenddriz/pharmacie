import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PaymentModeService } from './payment-mode.service';
import { PaymentMode } from './payment-mode.entity';
import { PaymentModeInput } from './types/payment-mode.input';
import { uniqId } from '../shared/id-builder.service';

@Resolver(() => PaymentMode)
export class PaymentModeResolver {
  constructor(private readonly paymentModeService: PaymentModeService) {}
  @Query(() => [PaymentMode])
  async paymentModes(): Promise<PaymentMode[]> {
    console.log('called');
    return this.paymentModeService.findAll();
  }
  @Mutation(() => PaymentMode)
  async createPaymentMode(@Args('input') input: PaymentModeInput) {
    let paymentMode = await this.paymentModeService.findOneByLabel(input.label);
    if (!paymentMode) {
      paymentMode = new PaymentMode();
      paymentMode.id = await uniqId('PaymentMode');
      Object.assign<PaymentMode, PaymentModeInput>(paymentMode, input);
      paymentMode = await this.paymentModeService.save(paymentMode);
    }
    return paymentMode;
  }
  @Mutation(() => PaymentMode)
  async updatePaymentMode(@Args('input') input: PaymentModeInput) {
    const paymentMode = await this.paymentModeService.findOneById(input.id);
    Object.assign<PaymentMode, PaymentModeInput>(paymentMode, input);
    return await this.paymentModeService.save(paymentMode);
  }
}
