import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';

@Module({
  controllers: [],
  providers: [FileService, FileResolver],
})
export class FileModule {}
