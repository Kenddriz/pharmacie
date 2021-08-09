import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SaveDosageInput {
  @Field()
  id: number;
  @Field()
  parentId: number;
  @Field()
  label: string;
}
