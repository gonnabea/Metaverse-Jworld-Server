import { ImageModel } from "../entities/imageFile.entity";
import { VideoModel } from "../entities/videoFIle.entity";

export interface GetFileInput {
    ownerId: number
  }

export interface GetFileOutput {
    ok: boolean;
    error?: string;
    status: number;
    data?: ImageModel[] | VideoModel[] | []
}
  
  