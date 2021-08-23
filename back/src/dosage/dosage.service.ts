import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dosage } from './dosage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DosageService {
  constructor(
    @InjectRepository(Dosage) private repository: Repository<Dosage>,
  ) {}
  async save(dosage: Dosage): Promise<Dosage> {
    return await this.repository.save(dosage);
  }

  async findOneById(id: number): Promise<Dosage> {
    return this.repository.findOne(id);
  }
  async findAllByParentId(parentId = 0): Promise<Dosage[]> {
    return this.repository.find({ parentId });
  }
  async findAll(): Promise<Dosage[]> {
    return this.repository.find();
  }
  async findOneByLabel(label: string): Promise<Dosage> {
    return this.repository.findOne({ label });
  }

  remove(id: number) {
    return `This action removes a #${id} dosage`;
  }
}
