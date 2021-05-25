import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {

  @Field()
  id: number;

  @Field()
  username: string;
}
