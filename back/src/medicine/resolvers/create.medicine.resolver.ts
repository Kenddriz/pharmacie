import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MedicineService } from '../medicine.service';
import { Medicine } from '../medicine.entity';
import {UnitService} from '../../unit/unit.service';
import {QuantityService} from '../../quantity/quantity.service';
import {uniqId} from '../../shared/id-builder.service';
import {CreateMedicineInput} from '../types/medicine.input';
import {Quantity} from "../../quantity/quantity.entity";

@Resolver(() => Medicine)
export class CreateMedicineResolver {
  constructor(
      private readonly medicineService: MedicineService,
      private readonly unitService: UnitService,
      private readonly quantityService: QuantityService
  ) {}

  @Mutation(() => Medicine)
  async createMedicine(@Args('input') input: CreateMedicineInput): Promise<Medicine> {
    
    let medicine = await this.medicineService.findOneByDesignation(input.designation);
    if(medicine) 
      throw new Error(`Echec d'ajout du nouveau médicament! ${ medicine.designation } existe déjà ...`);
    
    const { type, quantities, ...res } = input;
    medicine = new Medicine();
    medicine.id = await uniqId('Medicine');
    Object.assign<Medicine, Omit<CreateMedicineInput, 'type'|'quantities'>>(medicine, res);
    medicine = await this.medicineService.save(medicine);

    for (const q of quantities) {
      const quantity = new Quantity();
      quantity.id = await uniqId('Quantity');
      quantity.price = q.price;
      quantity.stock = q.value;
      quantity.unit = await this.unitService.findOneById(q.unitId);
      quantity.medicine = medicine;
      await this.quantityService.save(quantity);
    }

    return medicine;
  }
}
