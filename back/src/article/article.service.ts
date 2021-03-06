import { Injectable } from '@nestjs/common';
import { ArticleDto } from './types/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Article } from './article.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { PaginationInput } from '../shared/shared.input';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private repository: Repository<Article>,
  ) {}
  create(article: Article) {
    return this.repository.save(article);
  }

  findAll() {
    return `This action returns all article`;
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
  async paginate(input: PaginationInput): Promise<Pagination<Article>> {
    const keyword = `%${input.keyword}%`;
    const queryBuilder = this.repository
      .createQueryBuilder('article')
      .where('article.dci ILIKE :keyword', { keyword })
      .where('article.commercialName ILIKE :keyword', { keyword })
      .orderBy('article.createdAt', 'DESC');

    const options: IPaginationOptions = {
      page: input.page,
      limit: input.limit,
    };
    return await paginate<Article>(queryBuilder, options);
  }
  async deleteForever(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async count(): Promise<number> {
    return this.repository.count();
  }
}
