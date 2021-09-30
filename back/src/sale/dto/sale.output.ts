import { Field, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { Sale } from '../sale.entity';

@ObjectType()
export class SalePagination {
  @Field(() => [Sale])
  items: Sale[];

  @Field(() => Meta)
  meta: Meta;
}
@ObjectType()
export class PaginatePatientSalesOutput {
  @Field(() => [Sale])
  items: Sale[];
  @Field(() => Meta)
  meta: Meta;
}
