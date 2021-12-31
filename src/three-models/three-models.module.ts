import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ThreeModelsService } from './three-models.service';
import { ThreeModelsResolver } from './three-models.resolver';
import { ThreeModel } from './entities/threeModel.entity';
import { MiniHompi } from 'src/mini-hompi/entities/miniHompi.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, ThreeModel, MiniHompi])
  ],
  providers: [ThreeModelsService, ThreeModelsResolver]
})
export class ThreeModelsModule {}
