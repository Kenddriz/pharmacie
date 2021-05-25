import { Injectable } from '@nestjs/common';
import { CreateMedicineTypeInput } from './dto/create-medicine-type.input';
import { UpdateMedicineTypeInput } from './dto/update-medicine-type.input';

@Injectable()
export class MedicineTypeService {
  create(createMedicineTypeInput: CreateMedicineTypeInput) {
    return 'This action adds a new medicineType';
  }

  findAll() {
    return `This action returns all medicineType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicineType`;
  }

  update(id: number, updateMedicineTypeInput: UpdateMedicineTypeInput) {
    return `This action updates a #${id} medicineType`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicineType`;
  }
}
