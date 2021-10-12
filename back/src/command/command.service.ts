import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from './command.entity';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationInput } from '../shared/shared.input';
import {
  ProviderCommandsChartInput,
  ProviderCommandsInput,
} from './dto/command.input';
import { ProviderCommandsChart } from './dto/command.dto';

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
  async providerCommands(
    input: ProviderCommandsInput,
  ): Promise<Pagination<Command>> {
    const queryBuilder = this.repository
      .createQueryBuilder('c')
      .where('c.providerId = :providerId', { providerId: input.providerId })
      .andWhere('EXTRACT(YEAR FROM c.createdAt) = :year', { year: input.year })
      .orderBy('c.createdAt', 'DESC');
    return await paginate<Command>(queryBuilder, {
      page: input.page,
      limit: input.limit,
    });
  }

  async providerCommandsChart(
    input: ProviderCommandsChartInput,
  ): Promise<ProviderCommandsChart[]> {
    return this.repository
      .createQueryBuilder('cmd')
      .leftJoin('invoices', 'inv', 'cmd.id = inv.commandId')
      .select('EXTRACT(MONTH FROM cmd.createdAt)', 'month')
      .addSelect('COUNT(cmd.id)', 'command')
      .addSelect('COUNT(inv.id)', 'invoice')
      .where('EXTRACT(YEAR FROM cmd.createdAt) = :year', { year: input.year })
      .andWhere('cmd.providerId = :providerId', {
        providerId: input.providerId,
      })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();
  }
  async countUndeliveredCommands(): Promise<number> {
    const payed = await this.repository
      .createQueryBuilder('c')
      .innerJoinAndSelect('invoices', 'invoice', 'invoice.commandId = c.id')
      .getCount();
    const all = await this.repository.count();
    return all - payed;
  }
  async commandsMonthly(year: number) {
    return this.repository
      .createQueryBuilder('cmd')
      .leftJoin('invoices', 'inv', 'cmd.id = inv.commandId')
      .select('EXTRACT(MONTH FROM cmd.createdAt)', 'month')
      .addSelect('COUNT(cmd.id)', 'command')
      .addSelect('COUNT(inv.id)', 'invoice')
      .where('EXTRACT(YEAR FROM cmd.createdAt) = :year', { year })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();
  }

  async remove(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async softRemove(command: Command): Promise<Command> {
    return this.repository.softRemove(command);
  }
  async restore(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
  async paginateDeleted(input: PaginationInput): Promise<Pagination<Command>> {
    const query = this.repository
      .createQueryBuilder('cmd')
      .where('cmd.archivedAt IS NOT NULL')
      .withDeleted()
      .orderBy('cmd.archivedAt', 'DESC');
    return paginate<Command>(query, { ...input });
  }
}
