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
      .orderBy('cl.medicineId', 'ASC')
      .getMany();
  }

  async findOne(id: string): Promise<CommandLine> {
    return await this.commandLineRepository.findOne(id);
  }

  async remove(id: string): Promise<number> {
    const query = await this.commandLineRepository.delete(id);
    return query.affected;
  }
}
