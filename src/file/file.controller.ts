import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  PostImageInput,
  postImageInput,
  PostVideoInput,
} from './dtos/postFIle.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('img_upload')
  @UseInterceptors(FileInterceptor('file'))
  postImage(
    @UploadedFile() file: Express.Multer.File,
    @Args() postImageInput: PostImageInput,
  ) {
    this.fileService.uploadImage(file, postImageInput);
  }

  @Post('video_upload')
  @UseInterceptors(FileInterceptor('file'))
  postVideo(
    @UploadedFile() file: Express.Multer.File,
    @Args() postVideoInput: PostVideoInput,
  ) {
    this.fileService.uploadVideo(file, postVideoInput);
  }
}

// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }
