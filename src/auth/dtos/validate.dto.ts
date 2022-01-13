import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Entity, Column, ManyToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class ValidateInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class ValidateOutput extends CoreOutput {
  @Column('text', { unique: true })
  @Field((type) => String)
  @IsEmail()
  email?: string;
}
