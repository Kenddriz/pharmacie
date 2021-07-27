import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommandInput {
  @Field()
  providerId: number;
}
@InputType()
export class UpdateCommandInput {
  @Field()
  id: number;
  @Field()
  providerId: number;
  @Field({ nullable: true })
  arrived?: boolean;
}
