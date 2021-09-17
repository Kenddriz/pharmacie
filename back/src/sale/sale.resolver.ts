import { Resolver, Query, Mutation, Args, Int, ResolveField, Root } from '@nestjs/graphql';
import { SaleService } from './sale.service';
import { Sale } from './sale.entity';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { PrescriptionService } from '../prescription/prescription.service';
import { Prescription } from '../prescription/prescription.entity';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(
    private saleService: SaleService,
    private prescriptionService: PrescriptionService,
  ) {}

  @Mutation(() => Sale)
  createSale(@Args('createSaleInput') createSaleInput: CreateSaleInput) {
    return this.saleService.create(createSaleInput);
  }

  @Query(() => [Sale], { name: 'sale' })
  findAll() {
    return this.saleService.findAll();
  }

  @Query(() => Sale, { name: 'sale' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.saleService.findOne(id);
  }

  @Mutation(() => Sale)
  updateSale(@Args('updateSaleInput') updateSaleInput: UpdateSaleInput) {
    return this.saleService.update(updateSaleInput.id, updateSaleInput);
  }

  @Mutation(() => Sale)
  removeSale(@Args('id', { type: () => Int }) id: number) {
    return this.saleService.remove(id);
  }
  @ResolveField(() => Prescription)
  async prescription(@Root() sale: Sale): Promise<Prescription> {
    return this.prescriptionService.findOneById(sale.prescriptionId);
  }
}
