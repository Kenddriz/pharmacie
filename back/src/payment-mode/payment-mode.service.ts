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
  async findAll(): Promise<PaymentMode[]> {
    return this.paymentModeRepository.find({ order: { label: 'ASC' } });
  }
  async remove(id: number): Promise<number> {
    await this.paymentModeRepository.delete(id);
    return id;
  }

  async findOneByLabel(label: string): Promise<PaymentMode> {
    label = label.toLowerCase();
    return this.paymentModeRepository
      .createQueryBuilder()
      .where('LOWER(label) = :label', { label })
      .getOne();
  }
}
