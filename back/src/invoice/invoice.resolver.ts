import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { CreateInvoiceInput, UpdateInvoiceInput } from './types/invoice.input';
import { uniqId } from '../shared/id-builder.service';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Mutation(() => Invoice)
  async createInvoice(@Args('input') input: CreateInvoiceInput) {
    const invoice = new Invoice();
    invoice.id = await uniqId('Invoice');
    Object.assign<Invoice, CreateInvoiceInput>(invoice, input);
    return this.invoiceService.save(invoice);
  }

  @Mutation(() => Invoice)
  async updateInvoice(@Args('input') input: UpdateInvoiceInput) {
    const invoice = await this.invoiceService.findOneById(input.id);
    Object.assign<Invoice, UpdateInvoiceInput>(invoice, input);
    return await this.invoiceService.save(invoice);
  }

}
