import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { ILike, Like, Repository } from 'typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { PaginationInput } from '../shared/shared.input';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private repository: Repository<Patient>,
  ) {}
  async save(patient: Patient) {
    return this.repository.save(patient);
  }

  findAll() {
    return `This action returns all patient`;
  }

  async findOneById(id: number) {
    return this.repository.findOne(id);
  }

  async findSuggestions(keyword: string): Promise<Patient[]> {
    keyword = `%${keyword}%`;
    return this.repository.find({
      where: [{ phone: Like(keyword) }, { name: ILike(keyword) }],
      take: 4,
    });
  }
  async paginate(input: PaginationInput): Promise<Pagination<Patient>> {
    const keyword = `%${input.keyword}%`;
    const query = this.repository
      .createQueryBuilder('p')
      .where(`p.name ILIKE :keyword`, { keyword })
      .orWhere(`p.phone ILIKE :keyword`, { keyword })
      .orderBy('p.name', 'ASC');
    return paginate<Patient>(query, { page: input.page, limit: input.limit });
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
