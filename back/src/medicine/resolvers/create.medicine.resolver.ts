import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MedicineService } from '../medicine.service';
import { Medicine } from '../medicine.entity';
import { UnitService } from '../../unit/unit.service';
import { uniqId } from '../../shared/id-builder.service';
import { CreateMedicineInput } from '../types/medicine.input';
import { MedicineFormService } from '../../medicine-form/medicine-form.service';
import { MedicineForm } from '../../medicine-form/medicine-form.entity';
import { FormService } from '../../form/form.service';

@Resolver(() => Medicine)
export class CreateMedicineResolver {
  constructor(
    private medicineService: MedicineService,
    private unitService: UnitService,
    private medicineFormService: MedicineFormService,
    private formService: FormService,
  ) {}

  @Mutation(() => [[Medicine]])
  async createMedicine(
    @Args({ name: 'input', type: () => [CreateMedicineInput] })
    medicines: CreateMedicineInput[],
  ): Promise<Array<Medicine[]>> {
    const created: Medicine[] = [];
    const exist: Medicine[] = [];

    for (const input of medicines) {
      let medicine = await this.medicineService.findOneByDesignation(
        input.designation,
      );
      if (medicine) exist.push(medicine);
      else {
        const { medicineForms, ...res } = input;
        medicine = new Medicine();
        medicine.id = await uniqId('Medicine');
        Object.assign<Medicine, Omit<CreateMedicineInput, 'medicineForms'>>(
          medicine,
          res,
        );
        medicine = await this.medicineService.save(medicine);

        for (const p of medicineForms) {
          const medForm = new MedicineForm();
          medForm.id = await uniqId('MedicineForm');
          medForm.medicine = medicine;
          medForm.price = p.price;
          medForm.expiration = p.expiration;
          medForm.vat = p.vat;
          medForm.stock = p.quantity;
          medForm.shop = p.quantity;
          medForm.form = await this.formService.findOneById(p.formId);
          medForm.unit = await this.unitService.findOneById(p.unitId);
          await this.medicineFormService.save(medForm);
        }
        created.push(medicine);
      }
    }
    return [created, exist];
  }
}
