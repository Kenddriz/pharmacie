import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthDto {
  @Field()
  payload: number;
}

@ObjectType()
export class LoginDto {
  @Field()
  token: string;
}
