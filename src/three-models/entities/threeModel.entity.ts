import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { MiniHompi } from '../../mini-hompi/entities/miniHompi.entity';
import { GraphQLJSONObject } from 'graphql-type-json'

interface XYZType {
    x: number;
    y: number;
    z: number;
}

@InputType('modelInputType')
@ObjectType()
@Entity()
export class ThreeModel extends CoreEntity {

  @Column('text')
  @Field(type => String)
  nickname: string;

  @Column({type:"json"})
  @Field(type => GraphQLJSONObject)
  position: XYZType;

  @Column({type:"json"})
  @Field(type => GraphQLJSONObject)
  scale: XYZType;

  @Column()
  @Field(type => Number)
  rotateX: number;

  @Column()
  @Field(type => Boolean)
  installed: boolean;

  @Column()
  @Field(type => Number)
  price: number;

  @ManyToOne(() => User, User => User.ownModels)
  @Field(type => User)
  owner: User;

  @ManyToOne(() => MiniHompi, MiniHompi => MiniHompi.threeModels)
  @Field(type => MiniHompi)
  miniHompi: MiniHompi;
  
  @Column()
  @Field(type => String, {nullable: true})
  videoUrl?: string;
  
  @Column()
  @Field(type => String, {nullable: true})
  imageUrl?: string;
  
  @Column()
  @Field(type => String, {nullable: true})
  textContents?: string;

}

