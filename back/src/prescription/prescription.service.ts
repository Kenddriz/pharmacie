import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './prescription.entity';
import { Repository } from 'typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private repository: Repository<Prescription>,
  ) {}
  async save(prescription: Prescription): Promise<Prescription> {
    return this.repository.save(prescription);
  }

  async findOneById(id: number): Promise<Prescription> {
    return this.repository.findOne(id);
  }

  async findBySale(saleId: number): Promise<Prescription> {
    return this.repository
      .createQueryBuilder(`p`)
      .where(`p.saleId = :saleId`, { saleId })
      .getOne();
  }
  async remove(id: number) {
    return this.repository.delete(id);
  }
}
