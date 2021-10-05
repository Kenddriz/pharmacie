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

  async findOneById(id: number): Promise<Payment> {
    return this.repository.findOne(id);
  }
}
