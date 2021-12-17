import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import User from './entities/user.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
    ) {}

    async join({email}) {
        try{
            const user = this.users.findOne({email});

            return user;
        }
        catch(err) {
            console.log(err)
        }
    }
}
