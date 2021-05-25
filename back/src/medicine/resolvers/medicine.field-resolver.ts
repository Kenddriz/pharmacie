import {ResolveField, Resolver, Root} from '@nestjs/graphql';
import {Medicine} from '../medicine.entity';
import {QuantityService} from '../../quantity/quantity.service';
import {Quantity} from '../../quantity/quantity.entity';

@Resolver(() => Medicine)
export class MedicineFieldResolver {
    constructor(private quantityService: QuantityService) {}
    @ResolveField(() => [Quantity])
    async quantities(@Root()medicine: Medicine): Promise<Quantity[]> {
        return await this.quantityService.findByMedicine(medicine.id);
    }
}