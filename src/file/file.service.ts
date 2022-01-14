import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  PostImageInput,
  PostImageOutput,
  PostVideoInput,
  PostVideoOutput,
} from './dtos/postFIle.dto';
import { ImageModel } from './entities/imageFile.entity';
import { VideoModel } from './entities/videoFIle.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(VideoModel)
    private readonly videoModelRepository: Repository<VideoModel>,
    @InjectRepository(ImageModel)
    private readonly imageModelRepository: Repository<ImageModel>,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    postImageInput: PostImageInput,
  ): PostImageOutput {}

  async uploadVideo(
    file: Express.Multer.File,
    postVideoInput: PostVideoInput,
  ): PostVideoOutput {}
}
