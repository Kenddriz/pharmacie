import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { Unit } from '../unit.entity';

/**Add parent to a category*/
@InputType()
export class CreateUnitInput extends PartialType(
  OmitType(Unit, ['id'] as const),
  InputType,
) {
  @Field(() => Int, { defaultValue: 0 })
  parentId: number;

  @Field()
  label: string;

  @Field()
  multiplicity: number;

  @Field()
  description: string;
}

/**update unit*/
@InputType()
export class UpdateUnitInput extends PartialType(CreateUnitInput, InputType) {
  @Field()
  id: number;
}

@InputType()
export class ChangeCatParentInput {
  @Field(() => Int)
  id: number;

  @Field()
  newParentId: number;
}

@InputType()
export class DeleteCatInput {
  @Field(() => Int)
  id: number;
}
