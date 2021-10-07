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

  findAll() {
    return `This action returns all assuredLine`;
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
    const queryBuilder = this.repository
      .createQueryBuilder('stm')
      .leftJoin('batches', 'btc', 'btc.id = stm.batchId')
      .where('btc.medicineId =:medicineId', { medicineId: input.medicineId });
    if (input.batchId)
      queryBuilder.where('btc.id =:batchId', {
        batchId: input.batchId,
      });
    queryBuilder.orderBy('stm.id', 'DESC');
    const { page, limit } = input;
    return await paginate<StockMovement>(queryBuilder, { page, limit });
  }
  async purchasePrice(id: number, batchId: number): Promise<number> {
    /**purchase price will previous enter price**/
    const query = await this.repository
      .createQueryBuilder('s')
      .select('s.price')
      .where('s.invoiceId IS NOT NULL')
      .andWhere(`s.batchId = :batchId`, { batchId })
      .andWhere(`s.id < :id`, { id })
      .orderBy('s.id', 'DESC')
      .getRawOne();
    return query.price || 0;
  }
}
