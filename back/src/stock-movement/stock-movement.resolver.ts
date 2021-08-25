import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StockMovementService } from './stock-movement.service';
import { StockMovement } from './stock-movement.entity';
import { StockMovementInput } from './dto/stock-movement.input';
import { UpdateStockMovementInput } from './dto/update-assured-line.input';

@Resolver(() => StockMovement)
export class StockMovementResolver {
  constructor(private readonly assuredLineService: StockMovementService) {}

  @Mutation(() => StockMovement)
  createAssuredLine(
    @Args('createAssuredLineInput') createAssuredLineInput: StockMovementInput,
  ) {
    return this.assuredLineService.create(createAssuredLineInput);
  }

  @Query(() => [StockMovement], { name: 'assuredLine' })
  findAll() {
    return this.assuredLineService.findAll();
  }

  @Query(() => StockMovement)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.assuredLineService.findOne(id);
  }

  @Mutation(() => StockMovement)
  updateAssuredLine(@Args('input') input: UpdateStockMovementInput) {
    return input;
  }

  @Mutation(() => StockMovement)
  removeAssuredLine(@Args('id', { type: () => Int }) id: number) {
    return this.assuredLineService.remove(id);
  }
}
