import { Resolver, Query, Mutation, Args, Int, ResolveField, Root } from '@nestjs/graphql';
import { StockMovementService } from './stock-movement.service';
import { StockMovement } from './stock-movement.entity';
import { UpdateStockMovementInput } from './dto/update-assured-line.input';
import { Delivery } from '../delivery/delivery.entity';
import { DeliveryService } from '../delivery/delivery.service';
import { BatchService } from '../batch/batch.service';
import { Batch } from '../batch/batch.entity';

@Resolver(() => StockMovement)
export class StockMovementResolver {
  constructor(
    private stmService: StockMovementService,
    private dlService: DeliveryService,
    private btService: BatchService,
  ) {}

  @Query(() => StockMovement)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stmService.findOne(id);
  }

  @Mutation(() => StockMovement)
  updateAssuredLine(@Args('input') input: UpdateStockMovementInput) {
    return input;
  }
  @ResolveField(() => Delivery)
  async delivery(@Root() stockMovement: StockMovement): Promise<Delivery> {
    return this.dlService.findOneById(stockMovement.deliveryId);
  }
  @ResolveField(() => Batch)
  async batch(@Root() stockMovement: StockMovement): Promise<Batch> {
    return this.btService.findOne(stockMovement.batchId);
  }
}
