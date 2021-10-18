import { Field, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { Invoice } from '../invoice.entity';

@ObjectType()
export class InvoicePagination {
  @Field(() => [Invoice])
  items: Invoice[];

  @Field(() => Meta)
  meta: Meta;
}
