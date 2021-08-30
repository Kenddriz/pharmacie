import { Injectable } from '@nestjs/common';
import { Method } from './method.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MethodService {
  constructor(
    @InjectRepository(Method)
    private repository: Repository<Method>,
  ) {}

  async save(paymentMode: Method): Promise<Method> {
    return this.repository.save(paymentMode);
  }

  async findOneById(id: number): Promise<Method> {
    return this.repository.findOne(id);
  }
  async findAll(): Promise<Method[]> {
    return this.repository.find({ order: { label: 'ASC' } });
  }
  async remove(id: number): Promise<number> {
    await this.repository.delete(id);
    return id;
  }

  async findOneByLabel(label: string): Promise<Method> {
    label = label.toLowerCase();
    return this.repository
      .createQueryBuilder()
      .where('LOWER(label) = :label', { label })
      .getOne();
  }
}
