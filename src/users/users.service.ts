import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from "typeorm";
import { JoinInput, JoinOutput } from './dtos/join.dto';
import { LoginOutput } from '../auth/dtos/login.dto';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt'



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async findOne(email) {
        try {
            const user = await this.userRepository.findOne({ email });
            
            if(user) {
                return {
                    email: user.email,
                    password: user.password
                }
            }
            
            
        }
        catch(error) {
            console.log(error)
        }
    }

    async join({ email, nickname, password, password2 }:JoinInput ):Promise<JoinOutput> {
        try{
            console.log("가입 시도.")
            const user = await this.userRepository.findOne({ email });
            
            if(user) {
                return {
                    ok: false,
                    error: "해당 이메일로 이미 가입된 유저가 있습니다."
                }
            }
    
            if(password === password2) {
                const newUser = this.userRepository.create({
                    email,
                    nickname,
                    password: await bcrypt.hash(password, process.env.BCRYPT_SALT_OR_ROUNDS)
                });  
    
                this.userRepository.save(newUser);
    
                return {
                    ok: true
                }
            }
            else {
                return {
                    ok: false,
                    error: "패스워드가 일치하지 않습니다."
                }
            }
    
        }
        catch(error) {
            return {
                ok: false,
                error
            }
        }
    }
}
