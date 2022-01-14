import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  OneToOne,
  RelationId,
  JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { ThreeModel } from 'src/three-models/entities/threeModel.entity';
import { MiniHompi } from 'src/mini-hompi/entities/miniHompi.entity';
import { ImageFile } from 'src/file/entities/imageFile.entity';
import { VideoFile } from 'src/file/entities/videoFIle.entity';

@InputType('userInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column('text')
  @Field((type) => String)
  nickname: string;

  @Column('text', { unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @ManyToMany(() => User, (User) => User.friends)
  @Field((type) => [User])
  friends: User[];

  @OneToMany(() => ThreeModel, (ThreeModel) => ThreeModel.owner, {
    cascade: true,
    nullable: true,
  })
  @Field(() => [ThreeModel], { nullable: true })
  ownModels: ThreeModel[];

  
  @RelationId((user: User) => user.miniHompi)
  @Field((type) => Number, { nullable: true })
  miniHompiId: number;
  
  @OneToOne(() => MiniHompi, (MiniHompi) => MiniHompi.owner, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  miniHompi: MiniHompi;
  
  @Column({ default: false })
  @Field((type) => String, { nullable: true })
  videoUrl?: string;
  
  @Column({ default: false })
  @Field((type) => String, { nullable: true })
  imageUrl?: string;

  // REST API용
  @OneToMany(() => ImageFile, (imageFile) => imageFile.owner, {
    cascade: true,
    nullable: true,
  })
  ownImages: ImageFile[];

  @OneToMany(() => VideoFile, (videoFile) => videoFile.owner, {
    cascade: true,
    nullable: true,
  })
  ownVideos: VideoFile[];
}
