import { Field, ObjectType } from '@nestjs/graphql';
import { Provider } from '../provider.entity';
import { Meta } from '../../shared/shared.dto';

@ObjectType()
export class ProviderPagination {
  @Field(() => [Provider])
  items: Provider[];

  @Field(() => Meta)
  meta: Meta;
}
