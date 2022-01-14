import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CoreOutput } from 'src/common/dtos/output.dto';
import * as bcrypt from 'bcrypt';
import { ValidateOutput } from './dtos/validate.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService, // private logger: Logger,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('asdfadsfadfa');
    const user = await this.userRepository.findOne({ email });
    console.log(user);

    if (!user) {
      return {
        ok: false,
        error: '조회되는 유저가 없습니다.',
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      return {
        ok: false,
        error: '비밀번호를 다시 확인해주세요.',
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<string | null> {
    const user = await this.userRepository.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log(checkPassword);

    if (user && checkPassword) {
      const { ...result } = user;
      console.log('validateUser Result: ', result);
      // this.logger.log('validateUser Result: ', result);
      const payload = { username: user.email, sub: user.id };

      return this.jwtService.sign(payload);
    }

    return null;
  }
}
