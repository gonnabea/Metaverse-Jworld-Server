import {
    Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { multerOptions } from 'src/lib/multerOptions';
import { CurrentUser } from 'src/users/users.decorator';
import { GetFileInput } from './dtos/getFile.dto';
import { PostFileInput } from './dtos/postFIle.dto';
import { FileService } from './file.service';

// 파일 업로드는 REST API로 처리

@Controller('file') // 기본 라우팅 주소
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('image_upload') // /file/image_upload
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async postImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() postImageInput: PostFileInput,
    @Request() req,
  ) {

    console.log("이미지 업로드")
    return this.fileService.uploadImage(file, postImageInput, req.user)
  }

  @Post('video_upload')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async postVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() postVideoInput: PostFileInput,
    @Request() req,
  ) {
    console.log(file)
    console.log(postVideoInput)
      console.log(req.user)
    return this.fileService.uploadVideo(file, postVideoInput, req.user);
  }

  @Get('image_get')
  async getImages(@Query('ownerId') getImageInput: number) {
    console.log("이미지 인풋", getImageInput)
    return this.fileService.getImages(getImageInput)
  }

  @Get('video_get')
  async getVideos(@Query('ownerId') getVideoInput: number) {
    console.log("비디오 인풋", getVideoInput)
    return this.fileService.getVideos(getVideoInput)
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
