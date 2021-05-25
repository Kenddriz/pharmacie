import { Resolver } from '@nestjs/graphql';
import { QuantityService } from './quantity.service';
import { Quantity } from './quantity.entity';

@Resolver(() => Quantity)
export class QuantityResolver {
  constructor(private readonly quantityService: QuantityService) {}
}
