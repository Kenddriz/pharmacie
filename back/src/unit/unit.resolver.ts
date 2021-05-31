import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';
import { uniqId } from '../shared/id-builder.service';
import { CreateUnitInput, UpdateUnitInput } from './types/unit.input';

@Resolver(() => Unit)
export class UnitResolver {
  constructor(private readonly unitService: UnitService) {}

  @Mutation(() => Unit)
  async createUnit(@Args('input') input: CreateUnitInput) {
    /**Make sure that new category doesn't exist*/
    const exist = await this.unitService.findOneByLabel(input.label);
    if (exist) throw new Error("L'unité " + exist.label + ' est existante ...');

    const parent = await this.unitService.findOneById(input.parentId);
    if (!parent) input.parentId = 0;
    /**Save the new category, surely not exist*/
    const unit = new Unit();
    unit.id = await uniqId('Unit');
    Object.assign<Unit, CreateUnitInput>(unit, input);
    return await this.unitService.save(unit);
  }

  @Query(() => [Unit])
  async units(): Promise<Unit[]> {
    return await this.unitService.findAll();
  }

  @Mutation(() => Unit)
  async updateUnit(@Args('input') input: UpdateUnitInput): Promise<Unit> {
    /**Make sure that new designation doesn't exist*/
    let unit = await this.unitService.findOneByLabel(input.label);
    if ((unit && unit.id != input.id) || input.id === 0)
      throw new Error("L'unité " + unit.label + ' existe déjà ...');

    unit = await this.unitService.findOneById(input.id);
    Object.assign<Unit, UpdateUnitInput>(unit, input);
    return await this.unitService.save(unit);
  }
}
