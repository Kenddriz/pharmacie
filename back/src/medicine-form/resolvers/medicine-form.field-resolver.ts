import { Resolver, ResolveField, Root } from '@nestjs/graphql';
import { UnitService } from '../../unit/unit.service';
import { Unit } from '../../unit/unit.entity';
import { MedicineForm } from '../medicine-form.entity';

@Resolver(() => MedicineForm)
export class MedicineFormFieldResolver {
  constructor(private readonly unitService: UnitService) {}
  @ResolveField(() => Unit)
  unit(@Root() medicineForm: MedicineForm) {
    return this.unitService.findOneById(medicineForm.unitId);
  }
}
