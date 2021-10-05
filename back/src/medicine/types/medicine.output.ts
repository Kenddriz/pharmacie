import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Medicine } from '../medicine.entity';
import { Meta } from '../../shared/shared.dto';

@ObjectType()
export class MedicinePaginationOutput {
  @Field(() => [Medicine])
  items: Medicine[];
  @Field(() => Meta)
  meta: Meta;
}

@ObjectType()
export class MostConsumedMedicineOutput {
  @Field(() => Medicine)
  medicine: Medicine;
  @Field(() => Int)
  count: number;
}
