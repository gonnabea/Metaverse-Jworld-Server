import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { VideoModel } from './entities/videoFIle.entity';
import { ImageModel } from './entities/imageFile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, VideoModel, ImageModel])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
