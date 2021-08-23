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
    Object.assign(medicine, res);
    return this.medicineService.save(medicine);
  }

  @Query(() => [Medicine], { name: 'medicine' })
  findAll() {
    return this.medicineService.findAll();
  }

  @Query(() => Medicine, { name: 'medicine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.medicineService.findOne(id);
  }

  @Mutation(() => Medicine)
  removeMedicine(@Args('id', { type: () => Int }) id: number) {
    return this.medicineService.remove(id);
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
