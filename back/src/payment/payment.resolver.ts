import { Resolver, Mutation, Args, ResolveField, Root } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { Method } from '../method/method.entity';
import { InvoiceService } from '../invoice/invoice.service';
import { MethodService } from '../method/method.service';
import { Invoice } from '../invoice/invoice.entity';
import { SavePaymentInput } from './dto/payment.input';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly invoiceService: InvoiceService,
    private methodService: MethodService,
  ) {}

  @Mutation(() => Invoice)
  async savePayment(@Args('input') input: SavePaymentInput): Promise<Invoice> {
    const { invoiceId } = input;
    const invoice = await this.invoiceService.findOneById(invoiceId);
    return invoice;
  }

  @ResolveField(() => Method)
  async method(@Root() payment: Payment): Promise<Method> {
    return await this.methodService.findOneById(payment.methodId);
  }
}
