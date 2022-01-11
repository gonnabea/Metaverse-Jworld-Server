import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@Resolver()
export class FileResolver {

    constructor() {}

    @Mutation(() => Boolean)
    async uploadImgFile(@Args({name: 'imgFile', type: () => GraphQLUpload})
    {
        createReadStream,
        filename
    }: FileUpload): Promise<boolean> {
        return new Promise(async (resolve, reject) => 
            createReadStream()
                .pipe(createWriteStream(`./uploads/images/${filename}`))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
    }

    @Mutation(() => Boolean)
    async uploadVideoFile(@Args({name: 'videoFile', type: () => GraphQLUpload})
    {
        createReadStream,
        filename
    }: FileUpload): Promise<boolean> {
        return new Promise(async (resolve, reject) => 
            createReadStream()
                .pipe(createWriteStream(`./uploads/videos/${filename}`))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
    }
}
