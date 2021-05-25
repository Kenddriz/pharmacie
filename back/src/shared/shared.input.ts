import {Field, InputType, ObjectType} from '@nestjs/graphql';
import { Stream } from 'stream';
import { IPaginationMeta, IPaginationOptions } from 'nestjs-typeorm-paginate';

@ObjectType()
export class Meta implements IPaginationMeta {
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

@InputType()
export class PaginationInput implements IPaginationOptions {
  @Field()
  keyword: string;

  @Field()
  page: number;

  @Field()
  limit: number;
}

@InputType()
export class Upload {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field(() => Stream)
  createReadStream: () => Stream;
}
