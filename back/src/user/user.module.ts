import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { hashSync } from 'bcrypt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {
  constructor(private userService: UserService) {
    this.userService.findOneById(1).then((user) => {
      if (!user) {
        const defaultUser = new User();
        defaultUser.id = 1;
        defaultUser.username = 'admin';
        defaultUser.password = hashSync('fary', 10);
        this.userService.save(defaultUser);
      }
    });
  }
}
