import { InputType, Int, Field } from '@nestjs/graphql';
import { PaginationInput } from '../../shared/shared.input';

@InputType()
export class SaveArticleInput {
  @Field(() => Int, { defaultValue: 0 })
  id: number;

  @Field()
  dci: string;

  @Field()
  commercialName: string;
}

@InputType()
export class FindByMeasureInput {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  foreignKey: 'formId' | 'dosageId' | 'packagingId';
}
@InputType()
export class PaginateArticleInput extends PaginationInput {
  @Field(() => FindByMeasureInput, { nullable: true })
  measureInput?: FindByMeasureInput;
}
