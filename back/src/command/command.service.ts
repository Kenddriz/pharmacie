import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from './command.entity';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationInput } from '../shared/shared.input';

@Injectable()
export class CommandService {
  constructor(
    @InjectRepository(Command)
    private repository: Repository<Command>,
  ) {}
  async save(command: Command): Promise<Command> {
    return this.repository.save(command);
  }
  async findOneById(id: number): Promise<Command> {
    return await this.repository.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async paginate(input: PaginationInput): Promise<Pagination<Command>> {
    const queryBuilder = this.repository
      .createQueryBuilder('c')
      .orderBy('c.createdAt', 'DESC');

    const { page, limit } = input;
    return await paginate<Command>(queryBuilder, { page, limit });
  }
}
