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
  username: string;
}
@InputType()
export class UpdatePasswordInput {
  @Field()
  currentPassword: string;
  @Field()
  newPassword: string;
}
