import { Injectable } from '@nestjs/common';
import { CreateMethodInput } from './dto/create-method.input';
import { UpdateMethodInput } from './dto/update-method.input';

@Injectable()
export class MethodService {
  create(createMethodInput: CreateMethodInput) {
    return 'This action adds a new method';
  }

  findAll() {
    return `This action returns all method`;
  }

  findOne(id: number) {
    return `This action returns a #${id} method`;
  }

  update(id: number, updateMethodInput: UpdateMethodInput) {
    return `This action updates a #${id} method`;
  }

  remove(id: number) {
    return `This action removes a #${id} method`;
  }
}
