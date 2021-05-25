import { AuthDto } from './auth.dto';

export type StrategyType = AuthDto & {
  iat: number;
  exp: string;
};
