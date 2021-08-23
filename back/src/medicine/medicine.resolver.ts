import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { MedicineService } from './medicine.service';
import { Medicine } from './medicine.entity';
import { MedicineInput } from './types/medicine.input';
import { uniqId } from '../shared/id-builder.service';
import { Form } from '../form/form.entity';
import { FormService } from '../form/form.service';
import { DosageService } from '../dosage/dosage.service';
import { PackagingService } from '../packaging/packaging.service';
import { Packaging } from '../packaging/packaging.entity';
import { Dosage } from '../dosage/dosage.entity';
import { ArticleService } from '../article/article.service';
import { Article } from '../article/article.entity';

@Resolver(() => Medicine)
export class MedicineResolver {
  constructor(
    private medicineService: MedicineService,
    private formService: FormService,
    private dosageService: DosageService,
    private packagingService: PackagingService,
    private articleService: ArticleService,
  ) {}

  @Mutation(() => Medicine)
  async saveMedicine(@Args('input') input: MedicineInput): Promise<Medicine> {
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
    return await this.medicineService.save(medicine);
  }

  @Query(() => [Medicine])
  findAll() {
    return this.medicineService.findAll();
  }

  @Mutation(() => Boolean)
  async softRemoveMedicine(@Args('id', { type: () => Int }) id: number) {
    return this.medicineService.softRemove(id);
  }
  @Mutation(() => Boolean)
  async deleteMedicine(@Args('id', { type: () => Int }) id: number) {
    return this.medicineService.delete(id);
  }
  @Mutation(() => Boolean)
  async recoverMedicine(@Args('id', { type: () => Int }) id: number) {
    return this.medicineService.recover(id);
  }
  /**Field resolver*/
  @ResolveField(() => Form)
  async form(@Root() medicine: Medicine): Promise<Form> {
    return await this.formService.findOne(medicine.formId);
  }
  @ResolveField(() => Dosage)
  async dosage(@Root() medicine: Medicine): Promise<Dosage> {
    return await this.dosageService.findOneById(medicine.dosageId);
  }
  @ResolveField(() => Packaging)
  async packaging(@Root() medicine: Medicine): Promise<Packaging> {
    return await this.packagingService.findOneById(medicine.packagingId);
  }
  @ResolveField(() => Article)
  async article(@Root() medicine: Medicine): Promise<Article> {
    return await this.articleService.findOneById(medicine.articleId);
  }
}
