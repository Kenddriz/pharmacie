import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import {
  CreateUserInput,
  UpdatePasswordInput,
  UpdateUserInput,
} from './types/user.input';
import { compareSync, hashSync } from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user-decorator';
import { StrategyType } from '../auth/types/strategy.type';
import { Upload } from '../shared/shared.input';
import { GraphQLUpload } from 'graphql-upload';
import { removeFile, uniqId, upload } from '../utils';

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @CurrentUser() strategy: StrategyType,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.findOneById(strategy.payload);
    Object.assign<User, UpdateUserInput>(user, input);
    return this.userService.save(user);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { nullable: true })
  async updatePassword(
    @CurrentUser() strategy: StrategyType,
    @Args('input') input: UpdatePasswordInput,
  ): Promise<User> {
    const user = await this.userService.findOneById(strategy.payload);
    const matched = await compareSync(input.currentPassword, user.password);
    if (!matched) return null;
    user.password = hashSync(input.newPassword, 10);
    return this.userService.save(user);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUserAvatar(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'avatar', type: () => GraphQLUpload }) file: Upload,
  ) {
    const user = await this.userService.findOneById(strategy.payload);
    removeFile('avatars/users/' + user.avatar);
    const { filename } = await upload(file, 'avatars/users', user.id);
    user.avatar = filename;
    return this.userService.save(user);
  }
}
