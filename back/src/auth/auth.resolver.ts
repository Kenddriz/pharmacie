import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './types/auth.dto';
import { AuthInput } from './types/auth.input';
import { User } from '../user/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user-decorator';
import { StrategyType } from './types/strategy.type';
import { UserService } from '../user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => LoginDto)
  async login(@Args('input') input: AuthInput): Promise<LoginDto> {
    const { id } = await this.authService.validateUser(input);
    return { token: await this.authService.login(id) };
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() strategy: StrategyType) {
    return await this.userService.findOneById(strategy.payload);
  }
}
