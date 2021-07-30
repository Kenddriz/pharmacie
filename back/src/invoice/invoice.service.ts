import { Injectable } from '@nestjs/common';
import { Invoice } from './invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationInput } from '../shared/shared.input';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}
  async save(invoice: Invoice): Promise<Invoice> {
    return this.invoiceRepository.save(invoice);
  }

  async findOneById(id: number): Promise<Invoice> {
    return this.invoiceRepository.findOne(id);
  }
  async findOneByCommandId(commandId: number): Promise<Invoice> {
    return this.invoiceRepository.findOne({ where: { commandId } });
  }
  async paginate(input: PaginationInput): Promise<Pagination<Invoice>> {
    const queryBuilder = this.invoiceRepository
      .createQueryBuilder('invoice')
      .orderBy('invoice.dueDate', 'ASC');
    const { page, limit } = input;
    return await paginate<Invoice>(queryBuilder, { page, limit });
  }
}
