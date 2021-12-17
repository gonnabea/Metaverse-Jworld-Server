import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from "typeorm";
import { JoinInput, JoinOutput } from './dtos/join.dto';
import { LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
    ) {}

    async join({ email, nickname, password, password2 }:JoinInput ):Promise<JoinOutput> {
        try{
            const user = this.users.findOne({ email });

            if(user) {
                return {
                    ok: false,
                    error: "해당 이메일로 이미 가입된 유저가 있습니다."
                }
            }

            return {
                ok: true,
                
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    async findOne(email):Promise<LoginOutput> {
        try {
            const user = await this.users.findOne({ email });
            
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
}
