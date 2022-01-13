import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { MiniHompi } from './entities/miniHompi.entity';
import { ThreeModel } from '../three-models/entities/threeModel.entity';
import { MiniHompiResolver } from './mini-hompi.resolver';
import { MiniHompiService } from './mini-hompi.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ThreeModel, MiniHompi])],
  providers: [MiniHompiResolver, MiniHompiService],
})
export class MiniHompiModule {}
