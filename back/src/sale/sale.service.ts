import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { Repository } from 'typeorm';
import { PaginationInput } from '../shared/shared.input';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginatePatientSalesInput } from './dto/sale.input';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private repository: Repository<Sale>,
  ) {}
  async save(sale: Sale) {
    return this.repository.save(sale);
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
  async softRemove(id: number): Promise<boolean> {
    const sale = await this.findOneWithChildren(id);
    const removed = await this.repository.softRemove(sale);
    return !!removed;
  }
  async findOneWithChildren(id: number): Promise<Sale> {
    return this.repository.findOne(id, {
      relations: ['stockMovements', 'prescription'],
    });
  }
  async remove(sale: Sale) {
    return this.repository.remove(sale);
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
}
