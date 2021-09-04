import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { BatchService } from './batch.service';
import { Batch } from './batch.entity';
import { BatchFormInput, UpdateBatchInput } from './dto/batch.input';
import { MedicineService } from '../medicine/medicine.service';
import { uniqId } from '../shared/id-builder.service';
import { Medicine } from '../medicine/medicine.entity';
import { StockMovement } from '../stock-movement/stock-movement.entity';
import { StockMovementService } from '../stock-movement/stock-movement.service';

@Resolver(() => Batch)
export class BatchResolver {
  constructor(
    private batchService: BatchService,
    private stmS: StockMovementService,
    private mdS: MedicineService,
  ) {}

  @Mutation(() => Medicine)
  async createBatch(@Args('input') input: BatchFormInput): Promise<Medicine> {
    let batch = await this.batchService.findExisting(
      input.medicineId,
      input.expirationDate,
    );
    if (batch) throw new Error('exist');
    batch = new Batch();
    batch.id = await uniqId('Batch');
    batch.medicine = await this.mdS.findOne(input.medicineId);
    Object.assign(batch, input);
    await this.batchService.save(batch);
    return batch.medicine;
  }
  @Mutation(() => Medicine)
  async updateBatch(@Args('input') input: UpdateBatchInput): Promise<Medicine> {
    let batch = await this.batchService.findExisting(
      input.form.medicineId,
      input.form.expirationDate,
    );
    if (batch && batch.id !== input.id) throw new Error('exist');
    else if (!batch) batch = await this.batchService.findOne(input.id);
    Object.assign(batch, input);
    await this.batchService.save(batch);
    return this.mdS.findOne(input.form.medicineId);
  }

  @Query(() => [Batch])
  findAll() {
    return this.batchService.findAll();
  }

  @Mutation(() => Batch)
  softRemove(@Args('id', { type: () => Int }) id: number) {
    return this.batchService.softRemove(id);
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
