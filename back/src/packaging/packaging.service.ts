import { Injectable } from '@nestjs/common';
import { Packaging } from './packaging.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PackagingService {
  constructor(
    @InjectRepository(Packaging)
    private readonly packagingRepository: Repository<Packaging>,
  ) {}

  async save(packaging: Packaging): Promise<Packaging> {
    return await this.packagingRepository.save(packaging);
  }

  async findOneById(id: number): Promise<Packaging> {
    return this.packagingRepository.findOne(id);
  }
  async findByIds(ids: number[]): Promise<Packaging[]> {
    return this.packagingRepository.findByIds(ids);
  }

  async remove(id: number): Promise<boolean> {
    const query = await this.packagingRepository.delete(id);
    return query.affected > 0;
  }

  async findAll(): Promise<Packaging[]> {
    return this.packagingRepository.find({
      order: { id: 'ASC' },
    });
  }
}
