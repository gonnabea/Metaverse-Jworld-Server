import {
    Field,
    InputType,
    ObjectType,
    PickType,
  } from '@nestjs/graphql';


  import { CoreOutput } from 'src/common/dtos/output.dto';
  import { Column } from 'typeorm';
  import { ThreeModel } from '../entities/threeModel.entity';

  import { MiniHompi } from 'src/mini-hompi/entities/miniHompi.entity';
  

  @InputType()
  export class UpdateUrlsInput extends PickType(ThreeModel, ['imageUrl', 'videoUrl', 'name', 'index']) {

  }
  
  @ObjectType()
  export class UpdateUrlsOutput extends CoreOutput {}
  