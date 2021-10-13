import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { Repository } from 'typeorm';
import { PaginationInput } from '../shared/shared.input';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginatePatientSalesInput } from './dto/sale.input';
import { CountSaleDaily } from './dto/sale.output';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private repository: Repository<Sale>,
  ) {}
  async save(sale: Sale): Promise<Sale> {
    return this.repository.save(sale);
  }
  async findOneById(id: number): Promise<Sale> {
    return this.repository.findOne(id);
  }
  async paginate(input: PaginationInput): Promise<Pagination<Sale>> {
    const queryBuilder = this.repository
      .createQueryBuilder('s')
      .orderBy('s.createdAt', 'DESC');
    return await paginate<Sale>(queryBuilder, { ...input });
  }
  async paginateByPatient(
    input: PaginatePatientSalesInput,
  ): Promise<Pagination<Sale>> {
    const { patientId, ...res } = input;
    const queryBuilder = this.repository
      .createQueryBuilder('s')
      .leftJoin('prescription', 'pres', 'pres.saleId = s.id')
      .where(`pres.patientId = :patientId`, { patientId })
      .orderBy('s.createdAt', 'DESC');
    return await paginate<Sale>(queryBuilder, { ...res });
  }
  /**sales during two latest weeks*/
  async currentWeek(): Promise<CountSaleDaily[]> {
    return this.repository
      .createQueryBuilder()
      .select(
        `COUNT(id) AS count, TO_CHAR("createdAt"::DATE, 'yyyy-mm-dd') AS day`,
      )
      .where(`date_trunc('week',"createdAt") = date_trunc('week',current_date)`)
      .groupBy('day')
      .orderBy(`day`, 'ASC')
      .getRawMany();
  }
  async lastWeek(): Promise<CountSaleDaily[]> {
    return this.repository
      .createQueryBuilder()
      .select(
        `COUNT(id) AS count, TO_CHAR("createdAt"::DATE, 'yyyy-mm-dd') AS day`,
      )
      .where(
        `"createdAt" >= date_trunc('week', current_date - interval '1 week')`,
      )
      .andWhere(`"createdAt" < date_trunc('week', current_date)`)
      .groupBy('day')
      .orderBy(`day`, 'ASC')
      .getRawMany();
  }

  async paginateDeleted(input: PaginationInput): Promise<Pagination<Sale>> {
    const query = this.repository
      .createQueryBuilder('sale')
      .where('sale.archivedAt IS NOT NULL')
      .withDeleted()
      .orderBy('sale.archivedAt', 'DESC');
    return paginate<Sale>(query, { ...input });
  }
  async findWithRelations(id: number): Promise<Sale> {
    return this.repository.findOne(id, {
      relations: ['stockMovements', 'prescription'],
    });
  }
  async remove(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async softRemove(sale: Sale): Promise<Sale> {
    return this.repository.softRemove(sale);
  }
  async restore(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
}
