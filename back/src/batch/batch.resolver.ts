import {
  Resolver,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
  Query,
} from '@nestjs/graphql';
import { BatchService } from './batch.service';
import { Batch } from './batch.entity';
import {
  BatchFormInput,
  FindExistingBatchInput,
  UpdateBatchInput,
} from './dto/batch.input';
import { MedicineService } from '../medicine/medicine.service';
import { uniqId } from '../utils';
import { Medicine } from '../medicine/medicine.entity';
import { StockMovement } from '../stock-movement/stock-movement.entity';
import { StockMovementService } from '../stock-movement/stock-movement.service';
import {
  BatchPaginationOutput,
  SoftRemoveBatchOutput,
} from './dto/batch.output';
import { PaginationInput } from '../shared/shared.input';

@Resolver(() => Batch)
export class BatchResolver {
  constructor(
    private batchService: BatchService,
    private stmS: StockMovementService,
    private mdS: MedicineService,
  ) {}

  @Mutation(() => Medicine, { nullable: true })
  async createBatch(@Args('input') input: BatchFormInput): Promise<Medicine> {
    let batch = await this.batchService.findExisting(
      input.medicineId,
      input.expirationDate,
    );
    if (batch) return null;
    batch = new Batch();
    batch.id = await uniqId('Batch');
    batch.medicine = await this.mdS.findOne(input.medicineId);
    Object.assign(batch, input);
    await this.batchService.save(batch);
    return batch.medicine;
  }
  @Mutation(() => Batch)
  async updateBatch(@Args('input') input: UpdateBatchInput): Promise<Batch> {
    let batch = await this.batchService.findExisting(
      input.form.medicineId,
      input.form.expirationDate,
    );
    if (batch && batch.id !== input.id) return null;
    else if (!batch) batch = await this.batchService.findOne(input.id);
    Object.assign(batch, input.form);
    return this.batchService.save(batch);
  }

  @Query(() => Batch, { nullable: true })
  async findExistingBatch(
    @Args('input') input: FindExistingBatchInput,
  ): Promise<Batch> {
    return this.batchService.findExisting(
      input.medicineId,
      input.expirationDate,
    );
  }
  @Query(() => BatchPaginationOutput)
  async paginateDeletedBatches(@Args('input') input: PaginationInput) {
    return this.batchService.paginateDeleted(input);
  }
  @Mutation(() => SoftRemoveBatchOutput)
  async softRemoveBatch(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<SoftRemoveBatchOutput> {
    const bt = await this.batchService.findOne(id);
    const batch = await this.batchService.softRemove(bt);
    return {
      medicine: await this.mdS.findOne(bt.medicineId),
      batch,
    };
  }
  @Mutation(() => Boolean)
  async removeBatch(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.batchService.remove(id);
  }
  @Mutation(() => Medicine, { nullable: true })
  async restoreBatch(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<Medicine> {
    const restored = await this.batchService.restore(id);
    if (!restored) return null;
    const { medicineId } = await this.batchService.findOne(id);
    return this.mdS.findOne(medicineId);
  }
  @Query(() => Number)
  async countStockMovements(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.stmS.countByBatch(id);
  }
  /**field resolver*/
  @ResolveField(() => Medicine)
  async medicine(@Root() batch: Batch): Promise<Medicine> {
    return this.mdS.findOne(batch.medicineId);
  }
  @ResolveField(() => [StockMovement])
  async stockMovements(@Root() batch: Batch): Promise<StockMovement[]> {
    return this.stmS.findByBatch(batch.id);
  }
}
