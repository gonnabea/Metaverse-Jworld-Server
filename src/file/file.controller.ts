import {
    Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CurrentUser } from 'src/users/users.decorator';
import { PostFileInput } from './dtos/postFIle.dto';
import { FileService } from './file.service';


@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('image_upload')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async postImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() postImageInput: PostFileInput,
    @Request() req,
  ) {
    console.log(file)
    console.log(postImageInput)
    console.log("이미지 업로드")
    return this.fileService.uploadImage(file, postImageInput, req.user)
  }

  @Post('video_upload')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('videoFile'))
  async postVideo(
    @UploadedFile() videoFile: Express.Multer.File,
    @Body() postVideoInput: PostFileInput,
    @Request() req,
  ) {
      console.log(req.user)
    return this.fileService.uploadVideo(videoFile, postVideoInput, req.user);
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
