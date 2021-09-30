import { ObjectType, Field } from '@nestjs/graphql';
import { Patient } from '../patient.entity';
import { Meta } from '../../shared/shared.dto';

@ObjectType()
export class PaginatePatientOutput {
  @Field(() => [Patient])
  items: Patient[];
  @Field(() => Meta)
  meta: Meta;
}
