import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SaveArticleInput {
  @Field(() => Int, { defaultValue: 0 })
  id: number;

  @Field()
  dci: string;

  @Field()
  commercialName: string;
}
