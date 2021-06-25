import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { MedicineFormService } from '../medicine-form.service';
import { MedicineForm } from '../medicine-form.entity';

@Resolver(() => MedicineForm)
export class MedicineFormResolver {
  constructor(private medicineFormService: MedicineFormService) {}
  @Mutation(() => MedicineForm)
  removeMedicineForm(@Args('id', { type: () => Int }) id: number) {
    return this.medicineFormService.remove(id);
  }
}
