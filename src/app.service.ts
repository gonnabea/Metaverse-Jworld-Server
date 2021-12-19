import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Repository } from "typeorm";
import { JoinInput, JoinOutput } from './users/dtos/join.dto';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
) {}


}
