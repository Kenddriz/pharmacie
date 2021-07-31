import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Measure } from '../measure.entity';
import { MeasureService } from '../measure.service';

@Resolver(() => Measure)
export class MeasureFieldResolver {
  constructor(private measureService: MeasureService) {}
  @ResolveField(() => [Measure])
  async children(@Root() measure: Measure): Promise<Measure[]> {
    return await this.measureService.findAllByParentId(measure.id);
  }
}
