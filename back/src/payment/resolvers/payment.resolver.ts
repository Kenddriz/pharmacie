import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from '../payment.service';
import { Payment } from '../payment.entity';
import { SavePaymentInput } from '../types/payment.input';
import { uniqId } from '../../shared/id-builder.service';
import { InvoiceService } from '../../invoice/invoice.service';
import { Invoice } from '../../invoice/invoice.entity';
import { PaymentModeService } from '../../payment-mode/payment-mode.service';
import { RemovePaymentModeDto } from '../../payment-mode/types/payment-mode.dto';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly invoiceService: InvoiceService,
    private paymentModeService: PaymentModeService,
  ) {}

  @Mutation(() => Invoice)
  async savePayment(@Args('input') input: SavePaymentInput): Promise<Invoice> {
    const { id, invoiceId, ...res } = input;
    let payment = new Payment();
    if (id !== 0) payment = await this.paymentService.findOneById(input.id);
    else payment.id = await uniqId('Payment');
    Object.assign(payment, res);
    await this.paymentService.save(payment);
    const invoice = await this.invoiceService.findOneById(invoiceId);
    invoice.paymentId = payment.id;
    await this.invoiceService.save(invoice);
    return invoice;
  }
  @Mutation(() => RemovePaymentModeDto)
  async removePaymentMode(
    @Args('id') id: number,
  ): Promise<RemovePaymentModeDto> {
    const payment = await this.paymentService.findOneByPaymentModeId(id);
    if (!payment) await this.paymentModeService.remove(id);
    return { id, payment };
  }
}
