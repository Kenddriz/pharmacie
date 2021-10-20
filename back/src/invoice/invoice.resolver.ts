import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
  Int,
} from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { Payment } from '../payment/payment.entity';
import {
  CreateInvoiceInput,
  InvoiceInput, PaginateInvoiceInput,
  UpdateInvoiceInput,
} from './types/invoice.input';
import { uniqId } from '../utils';
import { InvoicePagination } from './types/invoice.output';
import { PaginationInput } from '../shared/shared.input';
import { PaymentService } from '../payment/payment.service';
import { StockMovement } from '../stock-movement/stock-movement.entity';
import { StockMovementService } from '../stock-movement/stock-movement.service';
import { Command } from '../command/command.entity';
import { CommandService } from '../command/command.service';
import { Batch } from '../batch/batch.entity';
import { BatchService } from '../batch/batch.service';
import { MedicineService } from '../medicine/medicine.service';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(
    private invoiceService: InvoiceService,
    private commandService: CommandService,
    private paymentService: PaymentService,
    private stmS: StockMovementService,
    private btS: BatchService,
    private mdS: MedicineService,
  ) {}

  @Mutation(() => Command)
  async createInvoice(
    @Args('input') input: CreateInvoiceInput,
  ): Promise<Command> {
    const invoice = new Invoice();
    invoice.id = await uniqId('Invoice');
    const { commandId, ...invoiceInput } = input.invoice;
    const command = await this.commandService.findOneById(commandId);
    Object.assign<Invoice, Omit<InvoiceInput, 'commandId'>>(
      invoice,
      invoiceInput,
    );
    invoice.command = command;
    invoice.stockMovements = [];
    const medicines = await this.mdS.findByIds(
      input.assuredLines.map((i) => i.medicineId),
    );

    for (const form of input.assuredLines) {
      const { medicineId, expirationDate, ...res } = form;
      const medicine = medicines.find((m) => m.id === medicineId);
      let batch = await this.btS.findExisting(
        form.medicineId,
        form.expirationDate,
      );
      /**create batch if not exist yet*/
      if (!batch) {
        batch = new Batch();
        batch.id = await uniqId('Batch');
        batch.expirationDate = expirationDate;
        batch.medicine = medicine;
        batch.currentStock = res.quantity;
      } else {
        batch.currentStock += res.quantity;
      }
      /**update current vat*/
      medicine.currentVat = res.vat;
      await this.mdS.save(medicine);
      /**stock movement creation*/
      const stMvt = new StockMovement();
      stMvt.batch = await this.btS.save(batch); /**save batch*/
      Object.assign(stMvt, res);
      stMvt.stock = batch.currentStock;
      invoice.stockMovements.push(stMvt);
    }
    /***/
    await this.invoiceService.save(invoice);
    return command;
  }

  @Mutation(() => Invoice)
  async updateInvoice(@Args('input') input: UpdateInvoiceInput) {
    const invoice = await this.invoiceService.findOneById(input.id);
    Object.assign<Invoice, UpdateInvoiceInput>(invoice, input);
    return await this.invoiceService.save(invoice);
  }

  @Query(() => InvoicePagination)
  async paginateInvoices(
    @Args('input') input: PaginateInvoiceInput,
  ): Promise<InvoicePagination> {
    return await this.invoiceService.paginate(input);
  }
  /**Field resolver*/
  @ResolveField(() => Payment, { nullable: true })
  async payment(@Root() invoice: Invoice): Promise<Payment> {
    return await this.paymentService.findOneById(invoice.paymentId || 0);
  }
  @ResolveField(() => Command)
  async command(@Root() invoice: Invoice): Promise<Command> {
    return await this.commandService.findOneById(invoice.commandId);
  }
  /**field resolver*/
  @ResolveField(() => [StockMovement])
  async stockMovements(@Root() invoice: Invoice): Promise<StockMovement[]> {
    return this.stmS.findByInvoice(invoice.id);
  }
  @Query(() => Int)
  async countUnpaidInvoices() {
    return this.invoiceService.countUnpaid();
  }
  @Query(() => InvoicePagination)
  async paginateDeletedInvoices(
    @Args('input') input: PaginationInput,
  ): Promise<InvoicePagination> {
    return this.invoiceService.paginateDeleted(input);
  }
  @Mutation(() => Invoice)
  async softRemoveInvoice(@Args({ name: 'id', type: () => Int }) id: number) {
    const invoice = await this.invoiceService.findWithRelations(id);
    return this.invoiceService.softRemove(invoice);
  }
  @Mutation(() => Boolean)
  async removeInvoice(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.invoiceService.remove(id);
  }
  @Mutation(() => Invoice, { nullable: true })
  async restoreInvoice(@Args({ name: 'id', type: () => Int }) id: number) {
    const restored = await this.invoiceService.restore(id);
    if (restored) {
      const invoice = await this.invoiceService.findOneById(id);
      await this.stmS.restoreSoftDeleted('invoiceId', id);
      await this.paymentService.restore(invoice.paymentId);
      return invoice;
    }
    return null;
  }
}
