import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { ThreeModel } from '../../three-models/entities/threeModel.entity';
import { GraphQLJSONObject } from 'graphql-type-json'

interface XYZType {
    x: number;
    y: number;
    z: number;
}

@InputType('miniHompiInputType')
@ObjectType()
@Entity()
export class MiniHompi extends CoreEntity {

  @Column({type:"json"})
  @Field(type => GraphQLJSONObject)
  scale: XYZType;

  @OneToOne(() => User, User => User.miniHompi)
  @Field(type => User)
  owner: User;

  @OneToMany(() => ThreeModel, ThreeModel => ThreeModel.miniHompi)
  @Field(type => [MiniHompi])
  threeModels: ThreeModel[]
}

