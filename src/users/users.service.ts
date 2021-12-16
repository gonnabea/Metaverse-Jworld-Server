import { Injectable } from '@nestjs/common';
import { JoinDto, User } from 'types/User';

@Injectable()
export class UsersService {
    
    async create({email, nickname, password}: JoinDto): Promise<User | undefined> {
        // return this.users.create
        return undefined;
    }
}
