import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentService: Repository<Payment>,
  ) {}
  async save(payment: Payment): Promise<Payment> {
    return this.paymentService.save(payment);
  }

  findOneById(id: number) {
    return this.paymentService.findOne(id);
  }
}
