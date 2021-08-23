import { Injectable } from '@nestjs/common';
import { ArticleDto } from './types/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
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

  findOneById(id: number) {
    return this.repository.findOne(id);
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
  update(id: number, updateArticleInput: ArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
