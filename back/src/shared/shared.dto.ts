import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationMeta {
  @Field()
  itemCount: number;
  @Field()
  totalItems: number;
  @Field()
  itemsPerPage: number;
  @Field()
  totalPages: number;
  @Field()
  currentPage: number;
}
