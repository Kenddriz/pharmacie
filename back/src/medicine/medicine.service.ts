import { Injectable } from '@nestjs/common';
import { CreateMedicineInput } from './types/create-medicine.input';
import { MedicineInput } from './types/medicine.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine) private repository: Repository<Medicine>,
  ) {}
  async save(medicine: Medicine) {
    return this.repository.save(medicine);
  }

  findAll() {
    return `This action returns all medicine`;
  }

  async findOne(id: number) {
    return this.repository.findOne(id);
  }
  async findOneByArticle(articleId: number): Promise<Medicine[]> {
    return this.repository
      .createQueryBuilder('m')
      .where('m.articleId = :articleId', { articleId })
      .getMany();
  }
  update(id: number, updateMedicineInput: MedicineInput) {
    return `This action updates a #${id} medicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicine`;
  }
}
