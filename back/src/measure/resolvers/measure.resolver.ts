import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeasureService } from '../measure.service';
import { Measure } from '../measure.entity';
import { SaveMeasureInput } from '../types/measure.input';
import { uniqId } from '../../shared/id-builder.service';

@Resolver(() => Measure)
export class MeasureResolver {
  constructor(private readonly measureService: MeasureService) {}
  @Query(() => [Measure])
  async measures(@Args('measures') input: boolean): Promise<Measure[]> {
    if (input) return await this.measureService.findAllByParentId();
    return await this.measureService.measureUnits();
  }
  @Mutation(() => Measure)
  async saveMeasure(@Args('input') input: SaveMeasureInput): Promise<Measure> {
    let measure = new Measure();
    const { id, ...res } = input;
    if (id !== 0) measure = await this.measureService.findOneById(id);
    else measure.id = await uniqId('Measure');
    Object.assign(measure, res);
    await this.measureService.save(measure);
    if (res.parentId > 0)
      return await this.measureService.findOneById(res.parentId);
    return measure;
  }
  @Mutation(() => Measure)
  removeMeasure(@Args('id', { type: () => Int }) id: number) {
    return this.measureService.remove(id);
  }
}
