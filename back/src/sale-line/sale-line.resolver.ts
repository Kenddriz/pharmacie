import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SaleLineService } from './sale-line.service';
import { SaleLine } from './sale-line.entity';
import { CreateSaleLineInput } from './dto/create-sale-line.input';
import { UpdateSaleLineInput } from './dto/update-sale-line.input';

@Resolver(() => SaleLine)
export class SaleLineResolver {
  constructor(private readonly saleLineService: SaleLineService) {}

  @Mutation(() => SaleLine)
  createSaleLine(@Args('createSaleLineInput') createSaleLineInput: CreateSaleLineInput) {
    return this.saleLineService.create(createSaleLineInput);
  }

  @Query(() => [SaleLine], { name: 'saleLine' })
  findAll() {
    return this.saleLineService.findAll();
  }

  @Query(() => SaleLine, { name: 'saleLine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.saleLineService.findOne(id);
  }

  @Mutation(() => SaleLine)
  updateSaleLine(@Args('updateSaleLineInput') updateSaleLineInput: UpdateSaleLineInput) {
    return this.saleLineService.update(updateSaleLineInput.id, updateSaleLineInput);
  }

  @Mutation(() => SaleLine)
  removeSaleLine(@Args('id', { type: () => Int }) id: number) {
    return this.saleLineService.remove(id);
  }
}
