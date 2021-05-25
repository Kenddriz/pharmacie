import { Injectable } from '@nestjs/common';
import { CreateSalesLineInput } from './dto/create-sales-line.input';
import { UpdateSalesLineInput } from './dto/update-sales-line.input';

@Injectable()
export class SalesLineService {
  create(createSalesLineInput: CreateSalesLineInput) {
    return 'This action adds a new salesLine';
  }

  findAll() {
    return `This action returns all salesLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesLine`;
  }

  update(id: number, updateSalesLineInput: UpdateSalesLineInput) {
    return `This action updates a #${id} salesLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesLine`;
  }
}
