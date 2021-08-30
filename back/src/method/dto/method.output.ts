import { Field, ObjectType } from '@nestjs/graphql';
import { Payment } from '../../payment/payment.entity';

@ObjectType()
export class RemovePaymentModeDto {
  @Field()
  id: number;
  @Field(() => Payment, { nullable: true })
  payment?: Payment;
}
