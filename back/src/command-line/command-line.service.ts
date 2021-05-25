import { Injectable } from '@nestjs/common';
import { CreateCommandLineInput } from './dto/create-command-line.input';
import { UpdateCommandLineInput } from './dto/update-command-line.input';

@Injectable()
export class CommandLineService {
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
