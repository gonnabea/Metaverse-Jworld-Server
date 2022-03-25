import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
    PostFileInput, PostFileOutput,

} from './dtos/postFIle.dto';
import { ImageModel } from './entities/imageFile.entity';
import { VideoModel } from './entities/videoFIle.entity';
import { createFileURL } from "../lib/multerOptions";
import path from 'path';
import { GetFileInput, GetFileOutput } from './dtos/getFile.dto';

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
    
      createFileURL(file)
   
      const user = await this.userRepository.findOne({id: owner.userId});
     

      if(!user) {
        return {
          ok: false,
          error: "유저를 찾을 수 없습니다.",
          status: 403
        }
      }
      

      const newImageModel = this.imageModelRepository.create({
        title,
        description,
        imageUrl: "http://" + process.env.SERVER_URL + ":4000" + "/" + file.filename,
        owner: user
      })

    

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
    {title, description}: PostFileInput,
    owner
  ): Promise<PostFileOutput> {
      try{
  
        createFileURL(file)
     
        const user = await this.userRepository.findOne({id: owner.userId});
     
  
        if(!user) {
          return {
            ok: false,
            error: "유저를 찾을 수 없습니다.",
            status: 403
          }
        }
      
  
        const newVideoModel = this.videoModelRepository.create({
          title,
          description,
          videoUrl: "http://" + process.env.SERVER_URL + ":4000" + "/" + file.filename,
          owner: user
        })

  
        await this.videoModelRepository.save(newVideoModel);
      }
      catch(error) {
          return {
              ok: false,
              error,
              status: 400
          }
      }
  }

  async getImages(ownerId:number): Promise<GetFileOutput> {
    try {

      const owner = await this.userRepository.findOne({id: ownerId});

      if(!owner) {
        return {
          ok: false,
          error: "유저를 찾을 수 없습니다.",
          status: 403
        }
      }

      const ownImages = await this.imageModelRepository.find({owner});
      
      if(!ownImages) {
        return {
          ok: false,
          error: "이미지를 찾을 수 없습니다.",
          status: 409
        }
      }
   
      return {
        ok: true,
        status: 200,
        data: ownImages
      }

    }
    catch(error) {
      return {
        ok: false,
        error,
        status: 400
      }
    }
  }

  async getVideos(ownerId: number): Promise<GetFileOutput> {
    try {
      const owner = await this.userRepository.findOne({id: ownerId});

      if(!owner) {
        return {
          ok: false,
          error: "유저를 찾을 수 없습니다.",
          status: 403
        }
      }

      const ownVideos = await this.videoModelRepository.find({owner});

      if(!ownVideos) {
        return {
          ok: false,
          error: "비디오를 찾을 수 없습니다.",
          status: 409
        }
      }
      
      return {
        ok: true,
        status: 200,
        data: ownVideos
      }
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
