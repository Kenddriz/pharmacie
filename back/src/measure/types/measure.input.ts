import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SaveMeasureInput {
  @Field()
  id: number;
  @Field()
  parentId: number;
  @Field()
  label: string;
}
