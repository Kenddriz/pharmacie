import { Field, InputType, Int } from '@nestjs/graphql';

/**Add parent to a category*/
@InputType()
export class CreatePackagingInput {
  @Field()
  label: string;

  @Field()
  multiplicity: number;
}

/**update sale-packaging*/
@InputType()
export class UpdatePackagingInput {
  @Field()
  id: number;
  @Field(() => [CreatePackagingInput])
  units: CreatePackagingInput[];
}

@InputType()
export class DeleteCatInput {
  @Field(() => Int)
  id: number;
}
