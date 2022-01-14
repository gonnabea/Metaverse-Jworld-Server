import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ImageModel } from '../entities/imageFile.entity';
import { VideoModel } from '../entities/videoFIle.entity';

@InputType()
export class PostImageInput extends PickType(ImageModel, [
  'title',
  'description',
]) {}

@InputType()
export class PostVideoInput extends PickType(VideoModel, [
  'title',
  'description',
]) {}

@ObjectType()
export class PostImageOutput extends CoreOutput {}

@ObjectType()
export class PostVideoOutput extends CoreOutput {}
