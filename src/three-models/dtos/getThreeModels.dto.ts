import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { type } from 'os';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ThreeModel } from '../entities/threeModel.entity';
import { GraphQLJSONObject } from 'graphql-type-json';
import { MiniHompi } from 'src/mini-hompi/entities/miniHompi.entity';

interface XYZType {
  x: number;
  y: number;
  z: number;
}

@InputType()
export class GetThreeModelsInput extends PickType(MiniHompi, ['id']) {}

@ObjectType()
export class GetThreeModelsOutput extends CoreOutput {
  @Column()
  @Field((type) => [ThreeModel], { nullable: true })
  models?: ThreeModel[];
}
