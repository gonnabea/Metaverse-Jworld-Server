import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
    PostFileInput, PostFileOutput,

} from './dtos/postFIle.dto';
import { ImageModel } from './entities/imageFile.entity';
import { VideoModel } from './entities/videoFIle.entity';
import { createImageURL } from "../lib/multerOptions";
import path from 'path';
import { GetFileInput } from './dtos/getFile.dto';

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
    {title, description}: PostFileInput,
    owner
  ): Promise<PostFileOutput> {
    try{
      console.log(title, description)
      createImageURL(file)
   
      const user = await this.userRepository.findOne({id: owner.userId});
      console.log(user)

      if(!user) {
        return {
          ok: false,
          error: "유저를 찾을 수 없습니다.",
          status: 403
        }
      }
      console.log(file)

      const newImageModel = this.imageModelRepository.create({
        title,
        description,
        imageUrl: process.env.SERVER_URL + '/public' + "/" + file.filename,
        owner: user
      })

      console.log(newImageModel)

      await this.imageModelRepository.save(newImageModel);

    }
    catch(error) {
        return {
            ok: false,
            error,
            status: 400
        }
    }
  }

  async uploadVideo(
    file: Express.Multer.File,
    postVideoInput: PostFileInput,
    owner: User
  ): Promise<PostFileOutput> {
      try{

      }
      catch(error) {
          return {
              ok: false,
              error,
              status: 400
          }
      }
  }

  async getImages(getImageInput: GetFileInput) {
    try {

    }
    catch(error) {
      return {
        ok: false,
        error,
        status: 400
      }
    }
  }

  async getVideos(getVideoInput: GetFileInput) {
    try {

    }
    catch(error) {
      return {
        ok: false,
        error,
        status: 400
      }
    }
  }
  
}
