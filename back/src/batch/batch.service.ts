import { Injectable } from '@nestjs/common';
import { CreateParcelInput } from './dto/create-parcel.input';
import { UpdateParcelInput } from './dto/update-parcel.input';

@Injectable()
export class BatchService {
  create(createParcelleInput: CreateParcelInput) {
    return 'This action adds a new batch';
  }

  findAll() {
    return `This action returns all parcelle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parcelle`;
  }

  update(id: number, updateParcelleInput: UpdateParcelInput) {
    return `This action updates a #${id} parcelle`;
  }

  remove(id: number) {
    return `This action removes a #${id} parcelle`;
  }
}
