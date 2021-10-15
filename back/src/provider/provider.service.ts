import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { ILike, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { PaginationInput } from '../shared/shared.input';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private repository: Repository<Provider>,
  ) {}
  async save(provider: Provider): Promise<Provider> {
    return this.repository.save(provider);
  }

  async findOneById(id: number): Promise<Provider> {
    return this.repository.findOne(id);
  }
  async findProviders(keyword: string): Promise<Provider[]> {
    keyword = `%${keyword}%`;
    return this.repository.find({
      where: [{ name: ILike(keyword) }, { address: ILike(keyword) }],
      take: 5,
    });
  }
  async providers(): Promise<Provider[]> {
    return this.repository.find({
      order: { id: 'ASC' },
    });
  }
  async paginate(input: PaginationInput): Promise<Pagination<Provider>> {
    const queryBuilder = this.repository
      .createQueryBuilder('pro')
      .where('pro.name ILIKE :keyword', { keyword: `%${input.keyword}%` })
      .orderBy('pro.createdAt', 'DESC');

    const options: IPaginationOptions = {
      page: input.page,
      limit: input.limit,
    };
    return await paginate<Provider>(queryBuilder, options);
  }
  async count(): Promise<number> {
    return this.repository.count();
  }
  async remove(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async softRemove(pro: Provider): Promise<Provider> {
    return this.repository.softRemove(pro);
  }
  async restore(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
  async paginateDeleted(input: PaginationInput): Promise<Pagination<Provider>> {
    const query = this.repository
      .createQueryBuilder('pro')
      .where('pro.archivedAt IS NOT NULL')
      .withDeleted()
      .orderBy('pro.archivedAt', 'DESC');
    return paginate<Provider>(query, { ...input });
  }
}
