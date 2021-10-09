import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userService: Repository<User>,
  ) {}
  async save(user: User): Promise<User> {
    return this.userService.save(user);
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userService.findOne({ username });
  }

  async findOneById(id: number): Promise<User> {
    return this.userService.findOne({ id });
  }
}
