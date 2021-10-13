import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandLine } from './command-line.entity';
import { Repository, UpdateResult } from 'typeorm';

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
  async restoreSoftDeleted(
    by: 'commandId' | 'medicineId',
    id: number,
  ): Promise<UpdateResult> {
    return this.repository
      .createQueryBuilder()
      .update()
      .set({ archivedAt: null })
      .where(`${by} = :id`, { id })
      .execute();
  }
  async findOne(id: string): Promise<CommandLine> {
    return await this.repository.findOne(id);
  }
  async remove(id: string): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
}
