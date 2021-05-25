import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { CreatePaymentInput } from './types/payment.input';
import { PaymentModeService } from '../payment-mode/payment-mode.service';
import { PaymentMode } from '../payment-mode/payment-mode.entity';
import { uniqId } from '../shared/id-builder.service';
import { InvoiceService } from '../invoice/invoice.service';
import { Invoice } from '../invoice/invoice.entity';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentModeService: PaymentModeService,
    private readonly invoiceService: InvoiceService,
  ) {}

  @Mutation(() => Invoice)
  async createPayment(@Args('input') input: CreatePaymentInput): Promise<Invoice> {
    const payment = new Payment();
    const { paymentMode, invoiceId, ...res } = input;

    let mode = await this.paymentModeService.findOneByLabel(paymentMode);
    if (!mode) {
      mode = new PaymentMode();
      mode.id = await uniqId('PaymentMode');
      mode.label = paymentMode;
      mode = await this.paymentModeService.save(mode);
    }
    payment.paymentMode = mode;
    Object.assign<
      Payment,
      Omit<CreatePaymentInput, 'paymentMode' | 'invoiceId'>
    >(payment, res);

    let invoice = await this.invoiceService.findOneById(invoiceId);
    invoice.payment = await this.paymentService.save(payment);
    invoice = await this.invoiceService.save(invoice);

    return invoice;
  }
}
