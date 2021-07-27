import { Injectable } from '@nestjs/common';
import { UpdateFormInput } from './types/update.form.input';
import { Form } from './form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly FormRepository: Repository<Form>,
  ) {}
  save(form: Form) {
    return this.FormRepository.save(form);
  }

  findAll() {
    return this.FormRepository.find({ order: { label: 'ASC' } });
  }

  findOneById(id: number) {
    return this.FormRepository.findOne(id);
  }
  findByIds(ids: number[]): Promise<Form[]> {
    return this.FormRepository.findByIds(ids);
  }
  findOneByLabel(label: string) {
    return this.FormRepository.findOne({ label });
  }

  update(id: number, updateMedicineTypeInput: UpdateFormInput) {
    return `This action updates a #${id} medicineType`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicineType`;
  }
}
