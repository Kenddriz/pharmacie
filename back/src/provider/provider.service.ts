import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination
} from 'nestjs-typeorm-paginate';
import {PaginationInput} from '../shared/shared.input';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerService: Repository<Provider>,
  ) {}
  async save(provider: Provider): Promise<Provider> {
    return this.providerService.save(provider);
  }

  async findOneById(id: number): Promise<Provider> {
    return this.providerService.findOne(id);
  }

  async providers(): Promise<Provider[]> {
    return this.providerService.find( {
      order: { id: 'ASC' }
    });
  }

  async paginate(input: PaginationInput): Promise<Pagination<Provider>> {

    const queryBuilder = this.providerService.createQueryBuilder()
        .where('name LIKE :keyword', { keyword: `%${input.keyword}%` })
        .orderBy('created_at', 'DESC');

    const options:IPaginationOptions = {
      page: input.page,
      limit: input.limit
    }
    return await paginate<Provider>(queryBuilder, options);
  }
}
