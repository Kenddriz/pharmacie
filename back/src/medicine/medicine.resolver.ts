import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { MedicineService } from './medicine.service';
import { Medicine } from './medicine.entity';
import { DeleteMedicineInput, MedicineInput } from './types/medicine.input';
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
  async saveMedicine(@Args('input') input: MedicineInput): Promise<Article> {
    const { id, ...res } = input;
    let medicine: Medicine;
    if (id > 0) medicine = await this.medicineService.findOne(id);
    else {
      medicine = new Medicine();
      medicine.id = await uniqId('Medicine');
    }
    medicine.article = await this.articleService.findOneById(res.articleId);
    medicine.form = await this.formService.findOne(res.formId);
    medicine.dosage = await this.dosageService.findOneById(res.dosageId);
    medicine.packaging = await this.packagingService.findOneById(res.formId);
    await this.medicineService.save(medicine);
    return medicine.article;
  }

  @Query(() => [Medicine])
  async medicines() {
    return this.medicineService.findAll();
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
}
