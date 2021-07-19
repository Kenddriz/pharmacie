import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MedicineService } from '../medicine.service';
import { Medicine } from '../medicine.entity';
import { MedicineForm } from '../../medicine-form/medicine-form.entity';
import {
  CreateMedicineFormInput,
  UpdateMedicineFormInput,
} from '../../medicine-form/types/medicine.form.input';
import { FormService } from '../../form/form.service';
import { UnitService } from '../../unit/unit.service';
import { MedicineFormService } from '../../medicine-form/medicine-form.service';
import { uniqId } from '../../shared/id-builder.service';

@Resolver()
export class MedicineResolver {
  constructor(
    private medicineService: MedicineService,
    private formService: FormService,
    private unitService: UnitService,
    private medicineFormService: MedicineFormService,
  ) {}
  @Query(() => [Medicine])
  async medicines(): Promise<Medicine[]> {
    return await this.medicineService.findAll();
  }
  @Mutation(() => Medicine)
  async addMedicineForm(
    @Args('input') input: CreateMedicineFormInput,
  ): Promise<Medicine> {
    const medForm = new MedicineForm();
    medForm.id = await uniqId('MedicineForm');
    const { unitId, formId, quantity, medicineId, ...res } = input;
    Object.assign<MedicineForm, typeof res>(medForm, res);
    medForm.medicine = await this.medicineService.findOneById(medicineId);
    medForm.form = await this.formService.findOneById(formId);
    medForm.unit = await this.unitService.findOneById(unitId);
    medForm.stock = quantity;
    medForm.shop = quantity;
    await this.medicineFormService.save(medForm);
    return medForm.medicine;
  }

  @Mutation(() => MedicineForm)
  async updateMedicineForm(
    @Args('input') input: UpdateMedicineFormInput,
  ): Promise<MedicineForm> {
    const medForm = await this.medicineFormService.findOneById(input.id);
    const { unitId, formId, medicineId, ...res } = input;
    Object.assign<MedicineForm, typeof res>(medForm, res);
    medForm.medicine = await this.medicineService.findOneById(medicineId);
    medForm.form = await this.formService.findOneById(formId);
    medForm.unit = await this.unitService.findOneById(unitId);
    return await this.medicineFormService.save(medForm);
  }
}
