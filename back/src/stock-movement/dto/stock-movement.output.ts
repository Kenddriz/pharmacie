import { Field, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { StockMovement } from '../stock-movement.entity';

@ObjectType()
export class StockMovementPagination {
  @Field(() => [StockMovement])
  items: StockMovement[];

  @Field(() => Meta)
  meta: Meta;
}
