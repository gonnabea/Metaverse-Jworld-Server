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

interface XYZType {
  x: number;
  y: number;
  z: number;
}

@InputType('miniHompiInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MiniHompi extends CoreEntity {
  @Column({ type: 'json' })
  @Field((type) => GraphQLJSONObject)
  scale: XYZType;

  @RelationId((miniHompi: MiniHompi) => miniHompi.owner)
  @Field((type) => Number, { nullable: true })
  ownerId: number;

  @OneToOne(() => User, (User) => User.miniHompi, { nullable: true })
  @JoinColumn()
  owner: User;

  @OneToMany(() => ThreeModel, (ThreeModel) => ThreeModel.miniHompi, {
    nullable: true,
    cascade: true,
  })
  @Field((type) => [MiniHompi], { nullable: true })
  threeModels: ThreeModel[];
}
