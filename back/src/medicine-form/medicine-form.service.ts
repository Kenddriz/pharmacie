import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicineForm } from './medicine-form.entity';

@Injectable()
export class MedicineFormService {
  constructor(
    @InjectRepository(MedicineForm)
    private readonly medicineFormRepository: Repository<MedicineForm>,
  ) {}
  async save(medicineForm: MedicineForm) {
    return this.medicineFormRepository.save(medicineForm);
  }

  async findOneById(id: number) {
    return this.medicineFormRepository.findOne(id);
  }
  async findOneByBoth(medicineId: number, formId: number) {
    return this.medicineFormRepository
      .createQueryBuilder('medForm')
      .where('medForm.medicineId = :medicineId', { medicineId })
      .andWhere('medForm.formId = :formId', { formId })
      .getOne();
  }

  async findByMedicineId(medicineId: number): Promise<MedicineForm[]> {
    return this.medicineFormRepository
      .createQueryBuilder('form')
      .where('form.medicineId = :medicineId', { medicineId })
      .getMany();
  }

  remove(id: number) {
    return `This action removes a #${id} medicineForm`;
  }
}
