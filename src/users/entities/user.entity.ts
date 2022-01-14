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
import { ImageModel } from 'src/file/entities/imageFile.entity';
import { VideoModel } from 'src/file/entities/videoFIle.entity';

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

  // REST API용
  @OneToMany(() => ImageModel, (ImageModel) => ImageModel.owner, {
    cascade: true,
    nullable: true,
  })

  ownImages: ImageModel[];

  @OneToMany(() => VideoModel, (videoModel) => videoModel.owner, {
    cascade: true,
    nullable: true,
  })
  ownVideos: VideoModel[];
}
