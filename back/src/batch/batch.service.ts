import { Injectable } from '@nestjs/common';
import { Batch } from './batch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationInput } from '../shared/shared.input';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class BatchService {
  constructor(@InjectRepository(Batch) private repository: Repository<Batch>) {}

  async save(batch: Batch): Promise<Batch> {
    return this.repository.save(batch);
  }
  async findOne(id: number): Promise<Batch> {
    return this.repository.findOne(id);
  }
  async findByIds(ids: number[]): Promise<Batch[]> {
    return this.repository.findByIds(ids, {
      relations: ['medicine'],
    });
  }
  async findByMedicine(medicineId: number): Promise<Batch[]> {
    return this.repository
      .createQueryBuilder('b')
      .where('b.medicineId = :medicineId', { medicineId })
      .andWhere('b.expirationDate >= CURRENT_DATE')
      .getMany();
  }
  async findExisting(
    medicineId: number,
    expirationDate: string,
  ): Promise<Batch> {
    return this.repository
      .createQueryBuilder('b')
      .where('b.medicineId = :medicineId', { medicineId })
      .andWhere('b.expirationDate = :expirationDate', { expirationDate })
      .withDeleted()
      .getOne();
  }
  async remove(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async softRemove(batch: Batch): Promise<Batch> {
    return this.repository.softRemove(batch);
  }
  async restore(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
  async stockTotal(medicineId: number): Promise<number> {
    const { total } = await this.repository
      .createQueryBuilder('batch')
      .select('SUM(batch.currentStock) AS total')
      .where('batch.medicineId = :medicineId', { medicineId })
      .andWhere('batch.expirationDate >= CURRENT_DATE')
      .getRawOne();
    return total || 0;
  }
  async mostConsumed(year: number) {
    return this.repository
      .createQueryBuilder('batch')
      .select(['COUNT(stm.id) as count', 'batch.medicineId as medicine_id'])
      .innerJoin('stockMovements', 'stm', 'stm.batchId = batch.id')
      .innerJoin('sales', 'sale', 'sale.id = stm.saleId')
      .where('EXTRACT(YEAR FROM sale.createdAt) = :year', { year })
      .groupBy('medicine_id')
      .orderBy('count')
      .limit(5)
      .getRawMany();
  }
  async paginateDeleted(input: PaginationInput): Promise<Pagination<Batch>> {
    const query = this.repository
      .createQueryBuilder('batch')
      .where('batch.archivedAt IS NOT NULL')
      .withDeleted()
      .orderBy('batch.archivedAt', 'DESC');
    return paginate<Batch>(query, { ...input });
  }
}
