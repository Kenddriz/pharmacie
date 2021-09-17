import { Injectable } from '@nestjs/common';
import { UpdatePrescriptionInput } from './dto/update-prescription.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './prescription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private repository: Repository<Prescription>,
  ) {}
  async save(prescription: Prescription): Promise<Prescription> {
    return this.repository.save(prescription);
  }

  findAll() {
    return `This action returns all prescription`;
  }

  async findOneById(id: number): Promise<Prescription> {
    return this.repository.findOne(id);
  }

  update(id: number, updatePrescriptionInput: UpdatePrescriptionInput) {
    return `This action updates a #${id} prescription`;
  }

  remove(id: number) {
    return `This action removes a #${id} prescription`;
  }
}
