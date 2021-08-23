import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Article } from '../article.entity';
import { Meta } from '../../shared/shared.dto';

@InputType()
export class ArticleDto {
  @Field(() => Int)
  id: number;
}
@ObjectType()
export class ArticlePagination {
  @Field(() => [Article])
  items: Article[];

  @Field(() => Meta)
  meta: Meta;
}
