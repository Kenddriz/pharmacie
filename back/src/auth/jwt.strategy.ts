import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../configuration/jwt';
import { Injectable } from '@nestjs/common';
import { StrategyType } from './types/strategy.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(strategyType: StrategyType) {
    return strategyType;
  }
}
