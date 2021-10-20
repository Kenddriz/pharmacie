import { Resolver, Mutation, Args, ResolveField, Root } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { Method } from '../method/method.entity';
import { InvoiceService } from '../invoice/invoice.service';
import { MethodService } from '../method/method.service';
import { Invoice } from '../invoice/invoice.entity';
import { CreatePaymentInput, UpdatePaymentInput } from './dto/payment.input';
import { uniqId } from '../utils';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private methodService: MethodService,
  ) {}

  @Mutation(() => Invoice)
  async createPayment(
    @Args('input') input: CreatePaymentInput,
  ): Promise<Invoice> {
    const { methodeId, ...res } = input.form;
    const payment = new Payment();
    payment.id = await uniqId('Payment');
    Object.assign(payment, res);
    payment.method = await this.methodService.findOneById(methodeId);
    const invoice = await this.invoiceService.findOneById(input.invoiceId);
    invoice.payment = payment;
    return await this.invoiceService.save(invoice);
  }
  @Mutation(() => Payment)
  async updatePayment(
    @Args('input') input: UpdatePaymentInput,
  ): Promise<Payment> {
    const { methodeId, ...res } = input.form;
    const payment = await this.paymentService.findOneById(input.id);
    Object.assign(payment, res);
    payment.method = await this.methodService.findOneById(methodeId);
    return await this.paymentService.save(payment);
  }
  @ResolveField(() => Method)
  async method(@Root() payment: Payment): Promise<Method> {
    return await this.methodService.findOneById(payment.methodId);
  }
}
