import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { Payment } from '../payment/payment.entity';
import { CreateInvoiceInput, UpdateInvoiceInput } from './dto/invoice.input';
import { uniqId } from '../shared/id-builder.service';
import { InvoicePagination } from './dto/invoice.output';
import { PaginationInput } from '../shared/shared.input';
import { DeliveryService } from '../delivery/delivery.service';
import { PaymentService } from '../payment/payment.service';
import { Delivery } from '../delivery/delivery.entity';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(
    private invoiceService: InvoiceService,
    private deliveryService: DeliveryService,
    private paymentService: PaymentService,
  ) {}

  @Mutation(() => Invoice)
  async createInvoice(@Args('input') input: CreateInvoiceInput) {
    const invoice = new Invoice();
    invoice.id = await uniqId('Invoice');
    Object.assign<Invoice, CreateInvoiceInput>(invoice, input);
    return await this.invoiceService.save(invoice);
  }

  @Mutation(() => Invoice)
  async updateInvoice(@Args('input') input: UpdateInvoiceInput) {
    const invoice = await this.invoiceService.findOneById(input.id);
    Object.assign<Invoice, UpdateInvoiceInput>(invoice, input);
    return await this.invoiceService.save(invoice);
  }

  @Query(() => InvoicePagination)
  async paginateInvoices(
    @Args('paginationInput') input: PaginationInput,
  ): Promise<InvoicePagination> {
    return await this.invoiceService.paginate(input);
  }
  @Query(() => Invoice)
  async findOneInvoice(@Args('commandId') commandId: number): Promise<Invoice> {
    return await this.invoiceService.findOneByCommandId(commandId);
  }

  @ResolveField(() => Payment)
  async payment(@Root() invoice: Invoice): Promise<Payment> {
    return await this.paymentService.findOneById(invoice.paymentId);
  }
  @ResolveField(() => Delivery)
  async delivery(@Root() invoice: Invoice): Promise<Delivery> {
    return await this.deliveryService.findOneById(invoice.deliveryId);
  }
}
