import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MedicineTypeService } from './medicine-type.service';
import { MedicineType } from './medicine-type.entity';
import { CreateMedicineTypeInput } from './dto/create-medicine-type.input';
import { UpdateMedicineTypeInput } from './dto/update-medicine-type.input';

@Resolver(() => MedicineType)
export class MedicineTypeResolver {
  constructor(private readonly medicineTypeService: MedicineTypeService) {}

  @Mutation(() => MedicineType)
  createMedicineType(@Args('createMedicineTypeInput') createMedicineTypeInput: CreateMedicineTypeInput) {
    return this.medicineTypeService.create(createMedicineTypeInput);
  }

  @Query(() => [MedicineType], { name: 'medicineType' })
  findAll() {
    return this.medicineTypeService.findAll();
  }

  @Query(() => MedicineType, { name: 'medicineType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.medicineTypeService.findOne(id);
  }

  @Mutation(() => MedicineType)
  updateMedicineType(@Args('updateMedicineTypeInput') updateMedicineTypeInput: UpdateMedicineTypeInput) {
    return this.medicineTypeService.update(updateMedicineTypeInput.id, updateMedicineTypeInput);
  }

  @Mutation(() => MedicineType)
  removeMedicineType(@Args('id', { type: () => Int }) id: number) {
    return this.medicineTypeService.remove(id);
  }
}
