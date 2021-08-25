import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BatchService } from './batch.service';
import { Batch } from './batch.entity';
import { CreateBatchInput, UpdateBatchInput } from './dto/batch.input';
import { MedicineService } from '../medicine/medicine.service';
import { uniqId } from '../shared/id-builder.service';
import { Medicine } from '../medicine/medicine.entity';

@Resolver(() => Batch)
export class BatchResolver {
  constructor(
    private batchService: BatchService,
    private medicineService: MedicineService,
  ) {}

  @Mutation(() => Medicine)
  async createBatch(@Args('input') input: CreateBatchInput): Promise<Medicine> {
    let batch = await this.batchService.findExisting(
      input.medicineId,
      input.manufactureDate,
    );
    if (batch) throw new Error('exist');
    batch = new Batch();
    batch.id = await uniqId('Batch');
    batch.medicine = await this.medicineService.findOne(input.medicineId);
    Object.assign(batch, input);
    await this.batchService.save(batch);
    return batch.medicine;
  }
  @Mutation(() => Medicine)
  async updateBatch(@Args('input') input: UpdateBatchInput): Promise<Medicine> {
    let batch = await this.batchService.findExisting(
      input.medicineId,
      input.manufactureDate,
    );
    if (batch && batch.id !== input.id) throw new Error('exist');
    else if (!batch) batch = await this.batchService.findOne(input.id);
    Object.assign(batch, input);
    await this.batchService.save(batch);
    return this.medicineService.findOne(input.medicineId);
  }

  @Query(() => [Batch])
  findAll() {
    return this.batchService.findAll();
  }

  @Mutation(() => Batch)
  softRemove(@Args('id', { type: () => Int }) id: number) {
    return this.batchService.softRemove(id);
  }
}
