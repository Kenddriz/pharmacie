import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Measure } from './measure.entity';

@Injectable()
export class MeasureService {
  constructor(
    @InjectRepository(Measure)
    private readonly measureRepository: Repository<Measure>,
  ) {}

  async save(measure: Measure): Promise<Measure> {
    return await this.measureRepository.save(measure);
  }

  async findOneById(id: number): Promise<Measure> {
    return this.measureRepository.findOne(id);
  }
  async findAllByParentId(parentId = 0): Promise<Measure[]> {
    return this.measureRepository.find({ parentId });
  }
  async measureUnits(): Promise<Measure[]> {
    return this.measureRepository.find({ parentId: Not(0) });
  }
  async findOneByLabel(label: string): Promise<Measure> {
    return this.measureRepository.findOne({ label });
  }
  remove(id: number) {
    return `This action removes a #${id} measure`;
  }
}
