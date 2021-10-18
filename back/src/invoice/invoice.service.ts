import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { PaginationInput } from '../shared/shared.input';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { PaginateInvoiceInput } from './types/invoice.input';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private repository: Repository<Invoice>,
  ) {}
  async save(invoice: Invoice): Promise<Invoice> {
    return this.repository.save(invoice);
  }

  async findOneById(id: number): Promise<Invoice> {
    return this.repository.findOne(id);
  }

  async findByCommandId(commandId: number): Promise<Invoice> {
    return this.repository
      .createQueryBuilder('invoice')
      .where('invoice.commandId = :commandId', { commandId })
      .getOne();
  }
  async paginate(input: PaginateInvoiceInput): Promise<Pagination<Invoice>> {
    const keyword = `%${input.keyword}%`;
    const queryBuilder = this.repository
      .createQueryBuilder('invoice')
      .where('invoice.reference ILIKE :keyword', { keyword });
    if (input.paymentId) {
      queryBuilder.andWhere('invoice.paymentId = :paymentId', {
        paymentId: input.paymentId,
      });
    }
    queryBuilder.orderBy('invoice.dueDate', 'ASC');
    const { page, limit } = input;
    return await paginate<Invoice>(queryBuilder, { page, limit });
  }
  async countUnpaid(): Promise<number> {
    return this.repository
      .createQueryBuilder('i')
      .where('i.paymentId IS NULL')
      .getCount();
  }

  async paginateDeleted(input: PaginationInput): Promise<Pagination<Invoice>> {
    const query = this.repository
      .createQueryBuilder('ic')
      .where('ic.archivedAt IS NOT NULL')
      .withDeleted()
      .orderBy('ic.archivedAt', 'DESC');
    return paginate<Invoice>(query, { ...input });
  }
  async findWithRelations(id: number): Promise<Invoice> {
    return this.repository.findOne(id, {
      relations: ['stockMovements', 'payment'],
    });
  }
  async softRemove(Invoice: Invoice): Promise<Invoice> {
    return this.repository.softRemove(Invoice);
  }
  async restore(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
  async remove(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
}
