import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice.entity';
import { CreateInvoiceInput, UpdateInvoiceInput } from '../types/invoice.input';
import { uniqId } from '../../shared/id-builder.service';
import { PaginationInput } from '../../shared/shared.input';
import { InvoicePagination } from '../types/invoice.dto';
import { CommandService } from '../../command/command.service';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(
    private invoiceService: InvoiceService,
    private commandService: CommandService,
  ) {}

  @Mutation(() => Invoice)
  async createInvoice(@Args('input') input: CreateInvoiceInput) {
    const invoice = new Invoice();
    invoice.id = await uniqId('Invoice');
    Object.assign<Invoice, CreateInvoiceInput>(invoice, input);
    await this.commandService.update(input.commandId, { arrived: true });
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
}
