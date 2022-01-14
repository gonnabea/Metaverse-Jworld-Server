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

@Entity()
export class ImageModel extends CoreEntity {
  
  @Column()
  imageUrl: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (User) => User.ownImages)
  owner: User;

}
