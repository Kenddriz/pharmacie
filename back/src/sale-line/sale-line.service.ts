import { Injectable } from '@nestjs/common';
import { CreateSaleLineInput } from './dto/create-sale-line.input';
import { UpdateSaleLineInput } from './dto/update-sale-line.input';

@Injectable()
export class SaleLineService {
  create(createSaleLineInput: CreateSaleLineInput) {
    return 'This action adds a new saleLine';
  }

  findAll() {
    return `This action returns all saleLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleLine`;
  }

  update(id: number, updateSaleLineInput: UpdateSaleLineInput) {
    return `This action updates a #${id} saleLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleLine`;
  }
}
