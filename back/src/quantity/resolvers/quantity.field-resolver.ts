import {ResolveField, Resolver, Root} from '@nestjs/graphql';
import {Quantity} from '../quantity.entity';
import {Unit} from '../../unit/unit.entity';
import {UnitService} from '../../unit/unit.service';

@Resolver(() => Quantity)
export class QuantityFieldResolver {
    constructor(private unitService: UnitService) {}
    @ResolveField(() => Unit)
    async unit(@Root()quantity: Quantity): Promise<Unit> {
        return await this.unitService.findOneById(quantity.unitId);
    }
}