import { Injectable } from '@nestjs/common';
import { PurchaseInput } from './types/purchase.input';
import { PurchaseDto } from './types/purchase.dto';

@Injectable()
export class CommandService {
  create(createCommandInput: PurchaseInput) {
    return 'This action adds a new command';
  }

  findAll() {
    return `This action returns all command`;
  }

  findOne(id: number) {
    return `This action returns a #${id} command`;
  }

  update(id: number, updateCommandInput: PurchaseDto) {
    return `This action updates a #${id} command`;
  }

  remove(id: number) {
    return `This action removes a #${id} command`;
  }
}
