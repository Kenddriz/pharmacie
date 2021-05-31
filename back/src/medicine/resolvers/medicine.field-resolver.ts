import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Medicine } from '../medicine.entity';
import { MedicineFormService } from '../../medicine-form/medicine-form.service';
import { MedicineForm } from '../../medicine-form/medicine-form.entity';

@Resolver(() => Medicine)
export class MedicineFieldResolver {
  constructor(private medicineFormService: MedicineFormService) {}
  @ResolveField(() => [MedicineForm])
  async medicineForms(@Root() medicine: Medicine): Promise<MedicineForm[]> {
    return await this.medicineFormService.findByMedicineId(medicine.id);
  }
}
