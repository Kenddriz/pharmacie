import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandLine } from './command-line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommandLineService {
  constructor(
    @InjectRepository(CommandLine)
    private commandLineRepository: Repository<CommandLine>,
  ) {}
  async create(input: Array<Record<string, any>>): Promise<void> {
    await this.commandLineRepository
      .createQueryBuilder()
      .insert()
      .values(input)
      .execute();
  }

  async update(input: Record<string, any>, id: number): Promise<void> {
    await this.commandLineRepository
      .createQueryBuilder()
      .update()
      .set(input)
      .where('id = :id', { id })
      .execute();
  }

  async findByCommandId(commandId: number): Promise<CommandLine[]> {
    return await this.commandLineRepository
      .createQueryBuilder('cl')
      .where('cl.commandId = :commandId', { commandId })
      .getMany();
  }

  async findOne(id: number): Promise<CommandLine> {
    return await this.commandLineRepository.findOne(id);
  }

  async remove(id: number): Promise<number> {
    const query = await this.commandLineRepository.delete(id);
    return query.affected;
  }
}
