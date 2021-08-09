import { Injectable } from '@nestjs/common';
import { CreateCommandLineInput } from './dto/create-command-line.input';
import { UpdateCommandLineInput } from './dto/update-command-line.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandLine } from './command-line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommandLineService {
  constructor(
    @InjectRepository(CommandLine)
    private commandLineRepository: Repository<CommandLine>,
  ) {}
  create(createCommandLineInput: CreateCommandLineInput) {
    return 'This action adds a new commandLine';
  }

  findAll() {
    return `This action returns all commandLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commandLine`;
  }

  update(id: number, updateCommandLineInput: UpdateCommandLineInput) {
    return `This action updates a #${id} commandLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} commandLine`;
  }
}
