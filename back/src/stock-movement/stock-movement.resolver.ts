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
import {
  CancelSaleLineOutput,
  StockMovementPagination,
} from './dto/stock-movement.output';
import {
  CancelSaleLinesInput,
  PaginateStockMovementInput,
} from './dto/stock-movement.input';
import { Sale } from '../sale/sale.entity';
import { SaleService } from '../sale/sale.service';
import { AddSaleLineInput, UpdateSaleLineInput } from '../sale/dto/sale.input';

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
    const altered = await this.stmService.findOne(id);
    const qDelta =
      assuredLine.quantity - altered.quantity; /**Quantity variation*/

    Object.assign(altered, assuredLine);
    if (qDelta !== 0) {
      altered.stock += qDelta;
      await this.stmService.updateInfected(id, altered.batchId, qDelta, '+');
    }

    /**Current stock of batch is the latest movement stock infected**/
    const latest = await this.stmService.findLastInfected(id, altered.batchId);
    const curBatch = await this.batchService.findOne(altered.batchId);
    curBatch.currentStock = latest?.stock || altered.stock;

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
      curBatch.expirationDate = batch.expirationDate;
    } else if (newBatch?.id !== curBatch.id) {
      newBatch.currentStock += assuredLine.quantity;
      altered.batch = newBatch;
      altered.stock = newBatch.currentStock;
    }
    await this.batchService.save(curBatch);

    return await this.stmService.save(altered);
  }

  @Mutation(() => StockMovement)
  async updateSaleLine(@Args('input') input: UpdateSaleLineInput) {
    const { id, batchId, ...stmInput } = input;
    const altered = await this.stmService.findOne(id);
    const qDelta = stmInput.quantity - altered.quantity;
    if (qDelta !== 0) {
      altered.stock -= qDelta;
      await this.stmService.updateInfected(id, batchId, qDelta);
    }
    Object.assign(altered, stmInput);
    /**Current stock of batch is the latest movement stock infected**/
    const latest = await this.stmService.findLastInfected(id, batchId);
    const curBatch = await this.batchService.findOne(altered.batchId);
    curBatch.currentStock = latest?.stock || altered.stock;
    await this.batchService.save(curBatch);

    return this.stmService.save(altered);
  }

  @Mutation(() => CancelSaleLineOutput)
  async cancelSaleLines(
    @Args('input') input: CancelSaleLinesInput,
  ): Promise<CancelSaleLineOutput> {
    const batches: Batch[] = [];

    for (const id of input.saleLineIds) {
      const { batchId, quantity } = await this.stmService.findOne(id);
      await this.stmService.updateInfected(id, batchId, quantity, '+');
      const batch = await this.batchService.findOne(batchId);
      batch.currentStock += quantity;
      await this.batchService.save(batch);
      await this.stmService.delete(id);
      batches.push(batch);
    }
    const sale = await this.saleService.findOneById(input.saleId);
    /**if no sale lines, remove forever**/
    return { sale, batches };
  }

  @Mutation(() => Sale)
  async addSaleLines(@Args('input') input: AddSaleLineInput): Promise<Sale> {
    const { saleId, saleLines } = input;
    const sale = await this.saleService.findOneById(saleId);
    for (const line of saleLines) {
      const { batchId, ...stmInput } = line;

      const batch = await this.batchService.findOne(batchId);
      batch.currentStock -= stmInput.quantity;
      await this.batchService.save(batch);

      const stm = new StockMovement();
      Object.assign(stm, stmInput);
      stm.batch = batch;
      stm.stock = batch.currentStock;
      stm.sale = sale;
      await this.stmService.save(stm);
    }
    return sale;
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
