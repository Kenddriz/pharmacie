import { Injectable } from '@nestjs/common';

import { Payment } from './payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private repository: Repository<Payment>,
  ) {}
  async save(payment: Payment): Promise<Payment> {
    return this.repository.save(payment);
  }

  async findOneById(id: number): Promise<Payment> {
    return this.repository.findOne(id);
  }
  async restoreSoftDeleted(invoiceId: number): Promise<UpdateResult> {
    return this.repository
      .createQueryBuilder()
      .update()
      .set({ archivedAt: null })
      .where(`invoiceId = :invoiceId`, { invoiceId })
      .execute();
  }
}
