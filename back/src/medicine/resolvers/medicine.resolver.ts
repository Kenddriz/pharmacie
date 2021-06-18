import { Query, Resolver } from '@nestjs/graphql';
import { MedicineService } from '../medicine.service';
import { Medicine } from '../medicine.entity';

@Resolver()
export class MedicineResolver {
  constructor(private medicineService: MedicineService) {}
  @Query(() => [Medicine])
  async medicines(): Promise<Medicine[]> {
    return await this.medicineService.findAll();
  }
}
