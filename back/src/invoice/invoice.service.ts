import { Injectable } from '@nestjs/common';
import { Invoice } from './invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
