import { Injectable } from '@nestjs/common';
import { CreateAssuredLineInput } from './dto/create-assured-line.input';
import { UpdateAssuredLineInput } from './dto/update-assured-line.input';
import { InjectRepository } from '@nestjs/typeorm';
import { AssuredLine } from './assured-line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssuredLineService {
  constructor(
    @InjectRepository(AssuredLine)
    private assuredLineRepository: Repository<AssuredLine>,
  ) {}
  create(createAssuredLineInput: CreateAssuredLineInput) {
    return 'This action adds a new assuredLine';
  }

  findAll() {
    return `This action returns all assuredLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assuredLine`;
  }

  update(id: number, updateAssuredLineInput: UpdateAssuredLineInput) {
    return `This action updates a #${id} assuredLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} assuredLine`;
  }
}
