import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Article } from './article.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { PaginationInput } from '../shared/shared.input';
import { PaginateArticleInput } from './types/article.input';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private repository: Repository<Article>,
  ) {}
  create(article: Article) {
    return this.repository.save(article);
  }

  async findOneById(id: number): Promise<Article> {
    return this.repository.findOne(id);
  }
  async findOne(keyword: string): Promise<Article> {
    keyword = `${keyword}%`;
    return this.repository.findOne({
      where: [{ dci: ILike(keyword) }, { commercialName: ILike(keyword) }],
    });
  }
  async paginate(input: PaginateArticleInput): Promise<Pagination<Article>> {
    const queryBuilder = this.repository.createQueryBuilder('article');
    if (!input?.measureInput) {
      const keyword = `%${input.keyword}%`;
      queryBuilder
        .where('article.dci ILIKE :keyword', { keyword })
        .where('article.commercialName ILIKE :keyword', { keyword });
    } else {
      let table = 'packaging';
      const id = input.measureInput.id;
      const foreignKey = input.measureInput.foreignKey;
      switch (foreignKey) {
        case 'dosageId':
          table = 'dosages';
          break;
        case 'formId':
          table = 'forms';
          break;
      }
      queryBuilder
        .innerJoin('medicines', 'med', 'med.articleId = article.id')
        .where(`med.${foreignKey} = :id`, { id });
    }
    queryBuilder.orderBy('article.createdAt', 'DESC');
    const options: IPaginationOptions = {
      page: input.page,
      limit: input.limit,
    };
    return await paginate<Article>(queryBuilder, options);
  }
  async count(): Promise<number> {
    return this.repository.count();
  }
  async paginateDeleted(input: PaginationInput): Promise<Pagination<Article>> {
    const query = this.repository
      .createQueryBuilder('cmd')
      .where('cmd.archivedAt IS NOT NULL')
      .withDeleted()
      .orderBy('cmd.archivedAt', 'DESC');
    return paginate<Article>(query, { ...input });
  }
  async softRemove(article: Article): Promise<Article> {
    return this.repository.softRemove(article);
  }
  async restore(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
  async remove(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
}
