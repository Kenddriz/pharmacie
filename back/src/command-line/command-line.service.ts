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
  async save(commandLine: CommandLine): Promise<CommandLine> {
    return this.commandLineRepository.save(commandLine);
  }

  async findByCommandId(commandId: number): Promise<CommandLine[]> {
    return this.commandLineRepository
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
