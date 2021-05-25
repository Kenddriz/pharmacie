import {Field, ObjectType} from '@nestjs/graphql';
import {Meta} from '../../shared/shared.input';
import { Provider } from '../provider.entity';

@ObjectType()
export class ProviderPagination {
    @Field(() => [Provider])
    items: Provider[];

    @Field(() => Meta)
    meta: Meta;
}