import { Injectable } from '@nestjs/common';
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

  async findOne(id: number): Promise<Medicine> {
    return this.repository.findOne(id);
  }
  async findOneByArticle(articleId: number): Promise<Medicine[]> {
    return this.repository
      .createQueryBuilder('m')
      .where('m.articleId = :articleId', { articleId })
      .getMany();
  }

  async delete(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async softRemove(id: number): Promise<boolean> {
    const query = await this.repository.softDelete(id);
    return query.affected > 0;
  }
  async recover(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
}
