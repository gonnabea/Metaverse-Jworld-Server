import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { User } from './users/entities/user.entity';
import { MiniHompiModule } from './mini-hompi/mini-hompi.module';
import { ThreeModelsModule } from './three-models/three-models.module';
import { ThreeModel } from './three-models/entities/threeModel.entity';
import { MiniHompi } from './mini-hompi/entities/miniHompi.entity';
import { FileModule } from './file/file.module';
import { ImageModel } from './file/entities/imageFile.entity';
import { VideoModel } from './file/entities/videoFIle.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // 환경변수 설정
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
      playground: true,
      context: ({ req, connection }) => {
        if (req) {
          const user = req.headers.authorization;
          return { ...req, user };
        } else {
          return connection;
        }
      },
    }),
 
    TypeOrmModule.forRoot({
      synchronize: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      entities: [User, ThreeModel, MiniHompi, ImageModel, VideoModel],
    }),
    TypeOrmModule.forFeature([
      User,
      ThreeModel,
      MiniHompi,
      ImageModel,
      VideoModel,
    ]),
    AuthModule,
    UsersModule,
    WebsocketModule,
    MiniHompiModule,
    ThreeModelsModule,
    FileModule,
  ],
  controllers: [],
  providers: [AppResolver, AppService],
})
export class AppModule {}
