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
    private readonly medicineService: MedicineService,
    private readonly unitService: UnitService,
    private readonly medicineFormService: MedicineFormService,
    private readonly formService: FormService,
  ) {}

  @Mutation(() => Medicine)
  async createMedicine(
    @Args('input') input: CreateMedicineInput,
  ): Promise<Medicine> {
    let medicine = await this.medicineService.findOneByDesignation(
      input.designation,
    );
    if (medicine)
      throw new Error(
        `Echec d'ajout du nouveau médicament! ${medicine.designation} existe déjà ...`,
      );

    const { medicineForms, ...res } = input;
    medicine = new Medicine();
    medicine.id = await uniqId('Medicine');
    Object.assign<Medicine, Omit<CreateMedicineInput, 'medicineForms'>>(
      medicine,
      res,
    );
    //medicine.formx = await this.
    medicine = await this.medicineService.save(medicine);

    for (const p of medicineForms) {
      const medForm = new MedicineForm();
      medForm.id = await uniqId('MedicineForm');
      medForm.medicine = medicine;
      medForm.price = p.price;
      medForm.vat = p.vat;
      medForm.stock = p.quantity;
      medForm.shop = p.quantity;
      medForm.form = await this.formService.findOneById(p.formId);
      await this.medicineFormService.save(medForm);
    }

    return medicine;
  }
}
