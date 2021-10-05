import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { Repository } from 'typeorm';
import { FindByMeasureInput } from './types/medicine.input';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

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
  async findByIds(ids: number[]): Promise<Medicine[]> {
    return this.repository.findByIds(ids);
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
    const medicine = await this.findOneWithChildren(id);
    await this.repository.softRemove(medicine);
    return !!medicine;
  }
  async recover(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
  async findOneWithChildren(id: number): Promise<Medicine> {
    return this.repository.findOne(id, {
      relations: ['batches', 'commandLines'],
    });
  }
  async findByMeasure(
    input: FindByMeasureInput,
  ): Promise<Pagination<Medicine>> {
    const { measureId, foreignKey, page, limit } = input;
    const queryBuilder = this.repository
      .createQueryBuilder('m')
      .withDeleted()
      .where(`m.${foreignKey} = :measureId`, { measureId })
      .orderBy('m.createdAt', 'DESC');
    return await paginate<Medicine>(queryBuilder, { page, limit });
  }
  async count(): Promise<number> {
    return this.repository.count();
  }
}
