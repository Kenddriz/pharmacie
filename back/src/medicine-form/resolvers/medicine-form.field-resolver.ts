import { Resolver, ResolveField, Root } from '@nestjs/graphql';
import { UnitService } from '../../unit/unit.service';
import { Unit } from '../../unit/unit.entity';
import { MedicineForm } from '../medicine-form.entity';
import { FormService } from '../../form/form.service';
import { Form } from '../../form/form.entity';

@Resolver(() => MedicineForm)
export class MedicineFormFieldResolver {
  constructor(
    private unitService: UnitService,
    private formService: FormService,
  ) {}
  @ResolveField(() => Unit)
  unit(@Root() medicineForm: MedicineForm) {
    return this.unitService.findOneById(medicineForm.unitId);
  }
  @ResolveField(() => Form)
  form(@Root() medicineForm: MedicineForm) {
    return this.formService.findOneById(medicineForm.formId);
  }
}
