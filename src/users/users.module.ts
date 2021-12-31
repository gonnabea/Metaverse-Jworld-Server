import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { ThreeModel } from 'src/three-models/entities/threeModel.entity';
import { MiniHompi } from 'src/mini-hompi/entities/miniHompi.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([User, ThreeModel, MiniHompi]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
