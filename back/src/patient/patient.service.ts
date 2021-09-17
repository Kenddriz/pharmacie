import { Injectable } from '@nestjs/common';
import { UpdatePatientInput } from './dto/update-patient.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';

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

  update(id: number, updatePatientInput: UpdatePatientInput) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
