import { Field, InputType, Int } from '@nestjs/graphql';
import { Unit } from '../packaging.entity';

/**Add parent to a category*/
@InputType()
export class CreatePackagingInput extends Unit {
  @Field()
  label: string;
  @Field(() => Int)
  multiplicity: number;
}

/**update sale-packaging*/
@InputType()
export class UpdatePackagingInput {
  @Field(() => Int)
  id: number;
  @Field(() => [CreatePackagingInput])
  units: CreatePackagingInput[];
}
