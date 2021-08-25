import { Injectable } from '@nestjs/common';
import { Batch } from './batch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BatchService {
  constructor(@InjectRepository(Batch) private repository: Repository<Batch>) {}
  async save(batch: Batch): Promise<Batch> {
    return this.repository.save(batch);
  }

  findAll() {
    return `This action returns all parcelle`;
  }

  async findOne(id: number): Promise<Batch> {
    return this.repository.findOne(id);
  }
  async findByMedicine(medicineId: number): Promise<Batch[]> {
    return this.repository
      .createQueryBuilder('b')
      .where('b.medicineId = :medicineId', { medicineId })
      .getMany();
  }
  async findExisting(
    medicineId: number,
    manufactureDate: string,
  ): Promise<Batch> {
    return this.repository
      .createQueryBuilder('b')
      .where('b.medicineId = :medicineId', { medicineId })
      .andWhere('b.manufactureDate = :manufactureDate', { manufactureDate })
      .getOne();
  }

  async delete(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async softRemove(id: number): Promise<boolean> {
    const query = await this.repository.softDelete(id);
    return query.affected > 0;
  }
  async recover(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
}
