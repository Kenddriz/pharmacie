import { Injectable } from '@nestjs/common';

import { Payment } from './payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private repository: Repository<Payment>,
  ) {}
  async save(payment: Payment): Promise<Payment> {
    return this.repository.save(payment);
  }

  findOneById(id: number) {
    return this.repository.findOne(id);
  }
  async findOneByPaymentModeId(paymentModeId: number) {
    return this.repository.findOne({ where: { paymentModeId } });
  }
}
