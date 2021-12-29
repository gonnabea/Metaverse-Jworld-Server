import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { IsEmail } from 'class-validator';

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
}

