import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './types/user.input';
import { uniqId } from '../shared/id-builder.service';
import {hashSync} from 'bcrypt';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const user = new User();
    user.id = await uniqId('User');
    input.password = hashSync(input.password, 10);
    Object.assign<User, CreateUserInput>(user, input);
    return await this.userService.save(user);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    const user = await this.userService.findOneById(input.id);
    if (!user) throw new Error('Utilisateur introuvable ...');
    Object.assign<User, UpdateUserInput>(user, input);
    return await this.userService.save(user);
  }
}
