import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
  Int,
} from '@nestjs/graphql';
import { MedicineService } from './medicine.service';
import { Medicine } from './medicine.entity';
import {
  CreateMedicineInput,
  DeleteMedicineInput,
  UpdateMedicineInput,
  MedicineFormInput,
  FindByMeasureInput,
} from './types/medicine.input';
import { uniqId } from '../shared/id-builder.service';
import { Form } from '../form/form.entity';
import { FormService } from '../form/form.service';
import { DosageService } from '../dosage/dosage.service';
import { PackagingService } from '../packaging/packaging.service';
import { Packaging } from '../packaging/packaging.entity';
import { Dosage } from '../dosage/dosage.entity';
import { ArticleService } from '../article/article.service';
import { Article } from '../article/article.entity';
import { BatchService } from '../batch/batch.service';
import { Batch } from '../batch/batch.entity';
import {
  MedicinePaginationOutput,
  MostConsumedMedicineOutput,
} from './types/medicine.output';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationInput } from '../shared/shared.input';

@Resolver(() => Medicine)
export class MedicineResolver {
  constructor(
    private medicineService: MedicineService,
    private formService: FormService,
    private dosageService: DosageService,
    private packagingService: PackagingService,
    private articleService: ArticleService,
    private batchService: BatchService,
  ) {}

  @Mutation(() => Article)
  async createMedicine(
    @Args('input') input: CreateMedicineInput,
  ): Promise<Article> {
    const medicine = new Medicine();
    medicine.id = await uniqId('Medicine');
    const { articleId, form } = input;
    medicine.article = await this.articleService.findOneById(articleId);
    await this.save(medicine, form);
    return medicine.article;
  }
  @Mutation(() => Medicine)
  async updateMedicine(
    @Args('input') input: UpdateMedicineInput,
  ): Promise<Medicine> {
    const { id, form } = input;
    const medicine = await this.medicineService.findOne(id);
    await this.save(medicine, form);
    return medicine;
  }

  @Query(() => MedicinePaginationOutput)
  async findMedicinesByMeasure(
    @Args('input') input: FindByMeasureInput,
  ): Promise<Pagination<Medicine>> {
    return this.medicineService.findByMeasure(input);
  }

  @Mutation(() => Article)
  async softRemoveMedicine(@Args('input') input: DeleteMedicineInput) {
    await this.medicineService.softRemove(input.medicineId);
    return this.articleService.findOneById(input.articleId);
  }
  @Mutation(() => Article)
  async deleteMedicine(@Args('input') input: DeleteMedicineInput) {
    await this.medicineService.delete(input.medicineId);
    return this.articleService.findOneById(input.articleId);
  }
  @Mutation(() => Article)
  async recoverMedicine(@Args('input') input: DeleteMedicineInput) {
    await this.medicineService.recover(input.medicineId);
    return this.articleService.findOneById(input.articleId);
  }
  /**Field resolvers*/
  @ResolveField(() => Form)
  async form(@Root() medicine: Medicine): Promise<Form> {
    return this.formService.findOne(medicine.formId);
  }
  @ResolveField(() => Dosage)
  async dosage(@Root() medicine: Medicine): Promise<Dosage> {
    return this.dosageService.findOneById(medicine.dosageId);
  }
  @ResolveField(() => Packaging)
  async packaging(@Root() medicine: Medicine): Promise<Packaging> {
    return this.packagingService.findOneById(medicine.packagingId);
  }
  @ResolveField(() => Article)
  async article(@Root() medicine: Medicine): Promise<Article> {
    return this.articleService.findOneById(medicine.articleId);
  }
  @ResolveField(() => [Batch])
  async batches(@Root() medicine: Medicine): Promise<Batch[]> {
    return this.batchService.findByMedicine(medicine.id);
  }
  private async save(
    medicine: Medicine,
    form: MedicineFormInput,
  ): Promise<void> {
    medicine.form = await this.formService.findOne(form.formId);
    medicine.dosage = await this.dosageService.findOneById(form.dosageId);
    medicine.packaging = await this.packagingService.findOneById(form.formId);
    medicine.currentSalePrice = form.currentSalePrice;
    medicine.currentVat = form.currentVat;
    await this.medicineService.save(medicine);
  }
  @Query(() => Int)
  async countMedicines() {
    return this.medicineService.count();
  }
  @ResolveField(() => Number)
  async stockTotal(@Root() medicine: Medicine) {
    return this.batchService.stockTotal(medicine.id);
  }
  @Query(() => [MostConsumedMedicineOutput])
  async mostConsumedMedicines(
    @Args({ name: 'year', type: () => Int }) year: number,
  ): Promise<MostConsumedMedicineOutput[]> {
    const batches: Array<{ medicine_id: number; count: number }> =
      await this.batchService.mostConsumed(year);
    const medicines = await this.medicineService.findByIds(
      batches.map((b) => b.medicine_id),
    );
    return medicines.map((medicine) => ({
      medicine,
      count: batches.find((b) => b.medicine_id === medicine.id).count,
    }));
  }
  @Query(() => [MedicinePaginationOutput])
  async paginateDeletedMedicines(@Args('input') input: PaginationInput) {
    return this.medicineService.paginateDeleted(input);
  }
}
