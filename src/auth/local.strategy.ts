import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateInput, ValidateOutput } from './dtos/validate.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate({ email: username, password }: ValidateInput): Promise<ValidateOutput> {
    const user = await this.authService.validateUser(username, password);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}