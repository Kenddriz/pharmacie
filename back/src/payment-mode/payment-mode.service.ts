import { Injectable } from '@nestjs/common';
import { PaymentMode } from './payment-mode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentModeService {
  constructor(
    @InjectRepository(PaymentMode)
    private paymentModeRepository: Repository<PaymentMode>,
  ) {}

  async save(paymentMode: PaymentMode): Promise<PaymentMode> {
    return this.paymentModeRepository.save(paymentMode);
  }

  async findOneById(id: number): Promise<PaymentMode> {
    return this.paymentModeRepository.findOne(id);
  }

  async findOneByLabel(label: string): Promise<PaymentMode> {
    label = label.toLowerCase();
    return this.paymentModeRepository
      .createQueryBuilder()
      .where('LOWER(label) = :label', { label })
      .getOne();
  }
}
