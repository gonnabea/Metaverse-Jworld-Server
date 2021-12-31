import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { IsEmail } from 'class-validator';
import { ThreeModel } from 'src/three-models/entities/threeModel.entity';
import { MiniHompi } from 'src/mini-hompi/entities/miniHompi.entity';

@InputType('userInputType')
@ObjectType()
@Entity()
export class User extends CoreEntity {

  @Column('text')
  @Field(type => String)
  nickname: string;

  @Column('text', { unique: true })
  @Field(type => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(type => String)
  password: string;

  @ManyToMany(() => User)
  @Field(type => [User], {nullable: true})
  friends?: User[];

  @OneToMany(() => ThreeModel, ThreeModel => ThreeModel.owner)
  @Field(() => [ThreeModel])
  ownModels?: ThreeModel[];


  @OneToOne(type => MiniHompi, MiniHompi => MiniHompi.owner)
  @Field(type => MiniHompi, {nullable: true})
  miniHompi?: MiniHompi
}

