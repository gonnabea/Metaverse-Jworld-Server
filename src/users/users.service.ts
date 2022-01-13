import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { JoinInput, JoinOutput } from './dtos/join.dto';
import { LoginOutput } from '../auth/dtos/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { GetMeOutput } from './dtos/getMe.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email) {
    try {
      const user = await this.userRepository.findOne({ email });

      if (user) {
        return {
          email: user.email,
          password: user.password,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async join({
    email,
    nickname,
    password,
    password2,
  }: JoinInput): Promise<JoinOutput> {
    try {
      console.log('가입 시도.');
      const user = await this.userRepository.findOne({ email });

      if (user) {
        return {
          ok: false,
          error: '해당 이메일로 이미 가입된 유저가 있습니다.',
          status: 409,
        };
      }

      const checkNickname = await this.userRepository.findOne({ nickname });

      if (checkNickname) {
        return {
          ok: false,
          error: '해당 닉네임의 유저가 이미 있습니다.',
          status: 403,
        };
      }

      if (password === password2) {
        console.log('패스워드 일치');

        const newUser = this.userRepository.create({
          email,
          nickname,
          password: await bcrypt.hash(
            password,
            parseInt(process.env.BCRYPT_SALT_OR_ROUNDS),
          ),
        });

        this.userRepository.save(newUser);

        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: '패스워드가 일치하지 않습니다.',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getMe({ userId, username }) {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      console.log(user);
      if (user) {
        const { id, email, nickname, createdAt, updatedAt } = user;

        return {
          ok: true,
          user: { id, email, nickname, createdAt, updatedAt },
          status: 200,
        };
      }

      return {
        ok: false,
        error: '로그인 된 유저를 찾을 수 없습니다.',
        status: 409,
      };
    } catch (error) {
      return {
        ok: false,
        error,
        status: 520,
      };
    }
  }
}
