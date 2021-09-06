import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { StockMovementService } from './stock-movement.service';
import { StockMovement } from './stock-movement.entity';
import { UpdateStockMovementInput } from './dto/update-assured-line.input';
import { BatchService } from '../batch/batch.service';
import { Batch } from '../batch/batch.entity';
import { InvoiceService } from '../invoice/invoice.service';
import { Invoice } from '../invoice/invoice.entity';

@Resolver(() => StockMovement)
export class StockMovementResolver {
  constructor(
    private stmService: StockMovementService,
    private invoiceService: InvoiceService,
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
  @ResolveField(() => Invoice)
  async invoice(@Root() stockMovement: StockMovement): Promise<Invoice> {
    return this.invoiceService.findOneById(stockMovement.invoiceId);
  }
  @ResolveField(() => Batch)
  async batch(@Root() stockMovement: StockMovement): Promise<Batch> {
    return this.btService.findOne(stockMovement.batchId);
  }
}
