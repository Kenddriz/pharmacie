import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInput } from './types/auth.input';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: AuthInput): Promise<User> {
    const user = await this.userService.findOneByUsername(login.username);

    if (!user) throw new UnauthorizedException('Utilisateur introuvable !');

    const isPasswordMatching = await compareSync(login.password, user.password);
    if (!isPasswordMatching)
      throw new UnauthorizedException('Mot de passe incorrect !');

    return user;
  }
  async login(payload: number): Promise<string> {
    return this.jwtService.sign({ payload });
  }
}
