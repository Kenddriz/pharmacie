import { Injectable } from '@nestjs/common';
import {Quantity} from './quantity.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class QuantityService {
  constructor(
      @InjectRepository(Quantity)
      private quantityRepository: Repository<Quantity>
  ) {
  }
  async save(quantity: Quantity): Promise<Quantity> {
    return this.quantityRepository.save(quantity) ;
  }

  async findOneById(id: number): Promise<Quantity> {
    return this.quantityRepository.findOne(id);
  }

  async findByMedicine(medicineId: number): Promise<Quantity[]> {
    return this.quantityRepository
        .createQueryBuilder()
        .where('medicineId = :medicineId', { medicineId })
        .getMany();
  }
}
