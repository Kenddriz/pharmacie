import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Article } from '../article/article.entity';
import { Form } from '../form/form.entity';
import { Dosage } from '../dosage/dosage.entity';
import { Unit } from '../package/packaging.entity';
import { Batch } from '../batch/batch.entity';

@ObjectType()
@Entity({ name: 'medicines' })
export class Medicine {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field(() => Article)
  article: Article;
  @Column()
  articleId: number;

  @Field(() => Form)
  form: Form;
  @Column()
  formId: number;

  @Field(() => Dosage)
  dosage: Dosage;
  @Column()
  dosageId: number;

  @Field(() => Unit)
  unit: Unit;
  @Column()
  unitId: number;

  @Field(() => Batch)
  batch: Batch;
}
