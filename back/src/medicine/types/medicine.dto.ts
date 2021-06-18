import { Field, ObjectType } from '@nestjs/graphql';
import { Medicine } from '../medicine.entity';

@ObjectType()
export class CreateMedicineDto {
  @Field(() => [Medicine])
  created: Medicine[];

  @Field(() => [Medicine])
  exist: Medicine[];
}
