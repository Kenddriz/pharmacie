import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockMovement } from './stock-movement.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PaginateStockMovementInput } from './dto/stock-movement.input';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class StockMovementService {
  constructor(
    @InjectRepository(StockMovement)
    private repository: Repository<StockMovement>,
  ) {}
  async save(stockMovement: StockMovement): Promise<StockMovement> {
    return this.repository.save(stockMovement);
  }
  async findOne(id: number): Promise<StockMovement> {
    return this.repository.findOne(id);
  }
  async findByInvoice(invoiceId: number): Promise<StockMovement[]> {
    return this.repository
      .createQueryBuilder('sm')
      .where(`sm.invoiceId = :invoiceId`, { invoiceId })
      .getMany();
  }
  async findBySale(saleId: number): Promise<StockMovement[]> {
    return this.repository
      .createQueryBuilder('sm')
      .where(`sm.saleId = :saleId`, { saleId })
      .getMany();
  }
  async findByBatch(batchId: number): Promise<StockMovement[]> {
    return this.repository
      .createQueryBuilder('sm')
      .where(`sm.batchId = :batchId`, { batchId })
      .getMany();
  }
  async updateInfected(
    startAt: number,
    batchId: number,
    qDelta: number,
    sign = '-',
  ): Promise<UpdateResult> {
    return this.repository
      .createQueryBuilder()
      .update()
      .set({ stock: () => `stock ${sign} ${qDelta}` })
      .where('id > :startAt', { startAt })
      .andWhere('batchId = :batchId', { batchId })
      .execute();
  }
  async findLastInfected(
    startAt: number,
    batchId: number,
  ): Promise<StockMovement> {
    return this.repository
      .createQueryBuilder('smt')
      .where('smt.id > :startAt', { startAt })
      .andWhere('smt.batchId = :batchId', { batchId })
      .withDeleted()
      .orderBy('smt.id', 'DESC')
      .getOne();
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
  async paginate(
    input: PaginateStockMovementInput,
  ): Promise<Pagination<StockMovement>> {
    const subQuery = this.repository
      .createQueryBuilder('stm')
      .select('stm.id')
      .leftJoin('batches', 'btc', 'btc.id = stm.batchId')
      .where(`btc.medicineId = ${input.medicineId}`);
    if (input.batchId) subQuery.where(`btc.id = ${input.batchId}`);
    subQuery.orderBy('stm.id', 'DESC');

    const { page, limit } = input;
    const query = this.repository
      .createQueryBuilder('res')
      .where('res.id IN (' + subQuery.getQuery() + ')')
      .orderBy('res.id', 'ASC');
    return await paginate<StockMovement>(query, { page, limit });
  }
  async countByBatch(batchId: number): Promise<number> {
    return this.repository
      .createQueryBuilder('m')
      .where(`m.batchId = :batchId`, { batchId })
      .getCount();
  }
  async restoreSoftDeleted(
    by: 'invoiceId' | 'saleId',
    id: number,
  ): Promise<UpdateResult> {
    return this.repository
      .createQueryBuilder()
      .update()
      .set({ archivedAt: null })
      .where(`${by} = :id`, { id })
      .execute();
  }
  /**get all lines until an entry spent**/
  async outingMovements(
    entryId: number,
    batchId: number,
    q0: number,
  ): Promise<StockMovement[]> {
    const subQuery = this.repository
      .createQueryBuilder()
      .select(['id', 'SUM(quantity) OVER (ORDER BY id ASC) AS total'])
      .where(`id > ${entryId}`)
      .andWhere(`"batchId" = ${batchId}`)
      .andWhere('"saleId" IS NOT NULL')
      .limit(q0);
    return this.repository
      .createQueryBuilder('stm')
      .innerJoin(`(${subQuery.getQuery()})`, 'joiner', 'joiner.id = stm.id')
      .andWhere('joiner.total - stm.quantity < :q0', { q0 })
      .orderBy('stm.id', 'ASC')
      .getMany();
  }
}
