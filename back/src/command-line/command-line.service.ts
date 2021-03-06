import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandLine } from './command-line.entity';
import { Repository } from 'typeorm';
import { PaginationInput } from '../shared/shared.input';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class CommandLineService {
  constructor(
    @InjectRepository(CommandLine)
    private repository: Repository<CommandLine>,
  ) {}
  async save(commandLine: CommandLine): Promise<CommandLine> {
    return this.repository.save(commandLine);
  }

  async findByCommandId(commandId: number): Promise<CommandLine[]> {
    return this.repository
      .createQueryBuilder('cl')
      .where('cl.commandId = :commandId', { commandId })
      .orderBy('cl.medicineId', 'ASC')
      .getMany();
  }

  async findOne(id: string): Promise<CommandLine> {
    return await this.repository.findOne(id);
  }

  async remove(id: string): Promise<number> {
    const query = await this.repository.delete(id);
    return query.affected;
  }
  async paginateDeleted(
    input: PaginationInput,
  ): Promise<Pagination<CommandLine>> {
    const query = this.repository
      .createQueryBuilder('cl')
      .where('cl.archivedAt IS NOT NULL')
      .orderBy('cl.archivedAt', 'DESC');
    return paginate<CommandLine>(query, { ...input });
  }
}
