import { Injectable } from '@nestjs/common';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private repository: Repository<Sale>,
  ) {}
  create(createSaleInput: CreateSaleInput) {
    return 'This action adds a new sale';
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }
  async findOneById(id: number): Promise<Sale> {
    return this.repository.findOne(id);
  }
  update(id: number, updateSaleInput: UpdateSaleInput) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
