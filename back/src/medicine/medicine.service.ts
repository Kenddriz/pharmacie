import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Medicine } from './medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) {}
  async save(medicine: Medicine): Promise<Medicine> {
    return this.medicineRepository.save(medicine);
  }

  async findAll(): Promise<Medicine[]> {
    return this.medicineRepository.find({ order: { designation: 'ASC' } });
  }

  async findOneById(id: number): Promise<Medicine> {
    return this.medicineRepository.findOne(id);
  }

  async findOneByDesignation(designation: string): Promise<Medicine> {
    return this.medicineRepository.findOne({ designation: ILike(designation) });
  }

  remove(id: number) {
    return `This action removes a #${id} medicine`;
  }
}
