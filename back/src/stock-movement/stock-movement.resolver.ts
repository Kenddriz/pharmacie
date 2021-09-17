import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Root,
  Query,
} from '@nestjs/graphql';
import { StockMovementService } from './stock-movement.service';
import { StockMovement } from './stock-movement.entity';
import { BatchService } from '../batch/batch.service';
import { Batch } from '../batch/batch.entity';
import { InvoiceService } from '../invoice/invoice.service';
import { Invoice } from '../invoice/invoice.entity';
import { UpdateAssuredLineInput } from '../invoice/dto/invoice.input';
import { MedicineService } from '../medicine/medicine.service';
import { StockMovementPagination } from './dto/stock-movement.output';
import { PaginateStockMovementInput } from './dto/stock-movement.input';
import { Sale } from '../sale/sale.entity';
import { SaleService } from '../sale/sale.service';

@Resolver(() => StockMovement)
export class StockMovementResolver {
  constructor(
    private stmService: StockMovementService,
    private invoiceService: InvoiceService,
    private batchService: BatchService,
    private medicineService: MedicineService,
    private saleService: SaleService,
  ) {}

  @Mutation(() => StockMovement)
  async updateAssuredLine(
    @Args('input') input: UpdateAssuredLineInput,
  ): Promise<StockMovement> {
    const { id, batch, assuredLine } = input;
    const alterationCause = await this.stmService.findOne(id);
    const qDelta =
      assuredLine.quantity - alterationCause.quantity; /**Quantity variation*/

    Object.assign(alterationCause, assuredLine);
    alterationCause.stock += qDelta;
    const smts = await this.stmService.findInfectedEntries(
      id,
      alterationCause.batchId,
    );
    for (const smt of smts) {
      smt.stock += qDelta;
      await this.stmService.save(smt);
    }

    const curbatch = await this.batchService.findOne(alterationCause.batchId);
    curbatch.currentStock =
      smts[smts.length - 1]?.stock || alterationCause.stock;
    if (input.updateCurVat) {
      const medicine = await this.medicineService.findOne(batch.medicineId);
      medicine.currentVat = assuredLine.vat;
      await this.medicineService.save(medicine);
    }

    const newBatch = await this.batchService.findExisting(
      batch.medicineId,
      batch.expirationDate,
    );

    if (!newBatch) {
      curbatch.expirationDate = batch.expirationDate;
    } else if (newBatch?.id !== curbatch.id) {
      newBatch.currentStock += assuredLine.quantity;
      alterationCause.batch = newBatch;
      alterationCause.stock = newBatch.currentStock;
    }
    await this.batchService.save(curbatch);

    return await this.stmService.save(alterationCause);
  }

  @Query(() => StockMovementPagination)
  async paginateStockMovement(
    @Args('input') input: PaginateStockMovementInput,
  ): Promise<StockMovementPagination> {
    return this.stmService.paginate(input);
  }
  @ResolveField(() => Invoice)
  async invoice(@Root() stockMovement: StockMovement): Promise<Invoice> {
    return this.invoiceService.findOneById(stockMovement.invoiceId);
  }
  @ResolveField(() => Batch)
  async batch(@Root() stockMovement: StockMovement): Promise<Batch> {
    return this.batchService.findOne(stockMovement.batchId);
  }
  @ResolveField(() => Sale)
  async sale(@Root() stockMovement: StockMovement): Promise<Sale> {
    return this.saleService.findOneById(stockMovement.saleId);
  }
}
