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
  save(user: User): Promise<User> {
    return this.userService.save(user);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userService.findOne({ username });
  }

  findOneById(id: number): Promise<User> {
    return this.userService.findOne({ id });
  }
}
