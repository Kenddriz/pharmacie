import { Injectable } from '@nestjs/common';
import { Packaging } from './packaging.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PackagingService {
  constructor(
    @InjectRepository(Packaging)
    private readonly repository: Repository<Packaging>,
  ) {}

  async save(packaging: Packaging): Promise<Packaging> {
    return await this.repository.save(packaging);
  }

  async findOneById(id: number): Promise<Packaging> {
    return this.repository.findOne(id);
  }
  async findByIds(ids: number[]): Promise<Packaging[]> {
    return this.repository.findByIds(ids);
  }
  async findAll(): Promise<Packaging[]> {
    return this.repository.find({
      order: { id: 'ASC' },
    });
  }
  async remove(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async softRemove(pack: Packaging): Promise<Packaging> {
    return this.repository.softRemove(pack);
  }
  async restore(id: number): Promise<boolean> {
    const query = await this.repository.restore(id);
    return query.affected > 0;
  }
  async deleted(): Promise<Packaging[]> {
    return this.repository
      .createQueryBuilder('pack')
      .where('pack.archivedAt IS NOT NULL')
      .withDeleted()
      .orderBy('pack.archivedAt', 'DESC')
      .getMany();
  }
}
