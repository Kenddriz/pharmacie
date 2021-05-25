import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalesLineService } from './sales-line.service';
import { SalesLine } from './sales-line.entity';
import { CreateSalesLineInput } from './dto/create-sales-line.input';
import { UpdateSalesLineInput } from './dto/update-sales-line.input';

@Resolver(() => SalesLine)
export class SalesLineResolver {
  constructor(private readonly salesLineService: SalesLineService) {}

  @Mutation(() => SalesLine)
  createSalesLine(@Args('createSalesLineInput') createSalesLineInput: CreateSalesLineInput) {
    return this.salesLineService.create(createSalesLineInput);
  }

  @Query(() => [SalesLine], { name: 'salesLine' })
  findAll() {
    return this.salesLineService.findAll();
  }

  @Query(() => SalesLine, { name: 'salesLine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salesLineService.findOne(id);
  }

  @Mutation(() => SalesLine)
  updateSalesLine(@Args('updateSalesLineInput') updateSalesLineInput: UpdateSalesLineInput) {
    return this.salesLineService.update(updateSalesLineInput.id, updateSalesLineInput);
  }

  @Mutation(() => SalesLine)
  removeSalesLine(@Args('id', { type: () => Int }) id: number) {
    return this.salesLineService.remove(id);
  }
}
