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
  InvoiceInput,
  UpdateInvoiceInput,
} from './dto/invoice.input';
import { uniqId } from '../shared/id-builder.service';
import { InvoicePagination } from './dto/invoice.output';
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

  @Mutation(() => Invoice)
  async createInvoice(@Args('input') input: CreateInvoiceInput) {
    const invoice = new Invoice();
    invoice.id = await uniqId('Invoice');
    const { commandId, ...invoiceInput } = input.invoice;
    Object.assign<Invoice, Omit<InvoiceInput, 'commandId'>>(
      invoice,
      invoiceInput,
    );
    invoice.command = await this.commandService.findOneById(commandId);
    const medicines = await this.mdS.findByIds(
      input.assuredLines.map((i) => i.medicineId),
    );

    for (const form of input.assuredLines) {
      const medicine = medicines.find((m) => m.id === form.medicineId);
      let batch = await this.btS.findExisting(
        form.medicineId,
        form.expirationDate,
      );
      /**create batch if not exist yet*/
      if (!batch) {
        batch = new Batch();
        batch.id = await uniqId('Batch');
        batch.expirationDate = form.expirationDate;
        batch.medicine = medicine;
      }
      /**update current vat*/
      medicine.currentVat = form.vat;
      await this.mdS.save(medicine);
      batch.currentStock += form.quantity;
      /**stock movement creation*/
      const stMvt = new StockMovement();
      stMvt.batch = await this.btS.save(batch); /**save batch*/
      //stMvt.invoice = invoice;
      stMvt.quantity = form.quantity;
      stMvt.price = form.price;
      stMvt.stock = batch.currentStock;
      stMvt.vat = form.vat;
      invoice.stockMovements.push(stMvt);
    }
    /***/
    return this.invoiceService.save(invoice);
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
  /**Field resolver*/
  @Mutation(() => Invoice)
  removeInvoice(@Args('id', { type: () => Int }) id: number) {
    return this.invoiceService.remove(id);
  }
  @ResolveField(() => Payment)
  async payment(@Root() invoice: Invoice): Promise<Payment> {
    return await this.paymentService.findOneById(invoice.paymentId);
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
}
