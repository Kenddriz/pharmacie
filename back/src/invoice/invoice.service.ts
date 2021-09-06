import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { PaginationInput } from '../shared/shared.input';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

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
  async paginate(input: PaginationInput): Promise<Pagination<Invoice>> {
    const queryBuilder = this.repository
      .createQueryBuilder('invoice')
      .orderBy('invoice.dueDate', 'ASC');
    const { page, limit } = input;
    return await paginate<Invoice>(queryBuilder, { page, limit });
  }
  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }
}
