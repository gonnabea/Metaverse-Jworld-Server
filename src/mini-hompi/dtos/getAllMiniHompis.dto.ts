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
export class GetAllMiniHompiInput {}

@ObjectType()
export class GetAllMiniHompiOutput extends CoreOutput {
  @Field((returns) => [MiniHompi], { nullable: true })
  @Column()
  miniHompis?: MiniHompi[];

  @Field((returns) => [User], { nullable: true })
  @Column()
  owners?: User[];

  @Field((returns) => String, { nullable: true })
  @Column()
  hompisWithOwners?: string;
}
