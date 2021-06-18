import { Injectable } from '@nestjs/common';
import { Unit } from './unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async save(unit: Unit): Promise<Unit> {
    return await this.unitRepository.save(unit);
  }

  async findOneById(id: number): Promise<Unit> {
    return this.unitRepository.findOne(id);
  }

  async findOneByLabel(label: string): Promise<Unit> {
    return await this.unitRepository.findOne({ label });
  }

  /**Only price wich doesn't have any child can be removed*/
  async remove(price: Unit): Promise<Unit> {
    return await this.unitRepository.remove(price);
  }

  async findAll(): Promise<Unit[]> {
    return this.unitRepository.find({
      order: { multiplicity: 'ASC' },
    });
  }
}
