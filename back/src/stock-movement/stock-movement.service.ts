import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockMovement } from './stock-movement.entity';
import { Repository } from 'typeorm';
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
  async findByBatch(batchId: number): Promise<StockMovement[]> {
    return this.repository
      .createQueryBuilder('sm')
      .where(`sm.batchId = :batchId`, { batchId })
      .getMany();
  }
  async findInfectedEntries(
    startAt: number,
    batchId: number,
  ): Promise<StockMovement[]> {
    return this.repository
      .createQueryBuilder('smt')
      .where('smt.id > :startAt', { startAt })
      .andWhere('smt.batchId = :batchId', { batchId })
      .withDeleted()
      .orderBy('smt.id', 'ASC')
      .getMany();
  }

  remove(id: number) {
    return `This action removes a #${id} assuredLine`;
  }
  async paginate(
    input: PaginateStockMovementInput,
  ): Promise<Pagination<StockMovement>> {
    const queryBuilder = this.repository
      .createQueryBuilder('stm')
      .leftJoin('batches', 'btc', 'btc.id = stm.batchId')
      .where('btc.medicineId =:medicineId', { medicineId: input.medicineId })
      .orderBy('stm.id', 'DESC');
    const { page, limit } = input;
    return await paginate<StockMovement>(queryBuilder, { page, limit });
  }
}
