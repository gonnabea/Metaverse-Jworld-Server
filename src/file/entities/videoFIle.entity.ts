import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  RelationId,
  JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { ThreeModel } from '../../three-models/entities/threeModel.entity';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType('videoInputType')
@ObjectType()
@Entity()
export class VideoModel extends CoreEntity {
  @Column()
  @Field((type) => String)
  videoUrl: string;

  @Column()
  @Field((type) => String)
  title: string;

  @Column()
  @Field((type) => String)
  description: string;

  @ManyToOne(() => User, (User) => User.ownVideos)
  @Field((type) => User)
  owner: User;
}
