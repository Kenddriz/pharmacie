import { Injectable } from '@nestjs/common';
import { CommandDto } from './types/command.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from './command.entity';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationInput } from '../shared/shared.input';

@Injectable()
export class CommandService {
  constructor(
    @InjectRepository(Command)
    private commandRepository: Repository<Command>,
  ) {}
  async create(input: Record<string, any>): Promise<void> {
    await this.commandRepository
      .createQueryBuilder()
      .insert()
      .values(input)
      .execute();
  }
  async update(id: number, input: Record<string, any>): Promise<void> {
    await this.commandRepository
      .createQueryBuilder()
      .update()
      .set(input)
      .where('id = :id', { id })
      .execute();
  }
  async findOneById(id: number): Promise<Command> {
    return await this.commandRepository.findOne(id);
  }

  async findPendingCommands(providerId: number): Promise<Command[]> {
    return await this.commandRepository
      .createQueryBuilder()
      .where('providerId = :providerId ', { providerId })
      .andWhere('arrived = :arrived', { arrived: false })
      .orderBy('createdAt', 'DESC')
      .getMany();
  }

  remove(id: number) {
    return `This action removes a #${id} command`;
  }
  async paginate(input: PaginationInput): Promise<Pagination<Command>> {
    const queryBuilder = this.commandRepository
      .createQueryBuilder()
      .orderBy('arrived', 'DESC');

    const { page, limit } = input;
    return await paginate<Command>(queryBuilder, { page, limit });
  }
}
