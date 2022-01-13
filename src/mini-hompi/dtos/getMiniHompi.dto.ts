import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { Column } from 'typeorm';
import { MiniHompi } from '../entities/miniHompi.entity';

@InputType()
export class GetMiniHompiInput extends PickType(MiniHompi, ['id']) {}

@ObjectType()
export class GetMiniHompiOutput extends CoreOutput {
  @Field((returns) => MiniHompi, { nullable: true })
  @Column()
  miniHompi?: MiniHompi;
}
