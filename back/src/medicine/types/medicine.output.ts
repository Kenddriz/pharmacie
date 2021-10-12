import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Medicine } from '../medicine.entity';
import { Meta } from '../../shared/shared.dto';
import { Article } from '../../article/article.entity';

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
@ObjectType()
export class SoftRemoveMedicineOutput {
  @Field(() => Medicine)
  medicine: Medicine;
  @Field(() => Article)
  article: Article;
}
