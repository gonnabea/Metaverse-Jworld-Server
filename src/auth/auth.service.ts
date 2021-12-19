import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CoreOutput } from 'src/common/dtos/output.dto';
import bcrypt from 'bcrypt'
import { ValidateOutput } from './dtos/validate.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from "typeorm";
import { LoginOutput } from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      private jwtService: JwtService
      ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log("asdfadsfadfa")
    const user = await this.userRepository.findOne({email});
    console.log(user)

    if (!user) {
        return {
            ok: false,
            error: "조회되는 유저가 없습니다."
        }
      }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result
    }
    else {
        return {
            ok: false,
            error: "비밀번호를 다시 확인해주세요."
        }
    }
    
  }

  async login(user: any):Promise<LoginOutput> {
    const payload = { username: user.email, sub: user.id };
    return {
      ok: true,
      access_token: this.jwtService.sign(payload),
    };
  }

  

}