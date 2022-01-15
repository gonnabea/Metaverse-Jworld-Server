import { ImageModel } from "../entities/imageFile.entity";
import { VideoModel } from "../entities/videoFIle.entity";

export interface PostFileInput {
  title: string;
  description: string;
}

export interface PostFileOutput {
  ok: boolean;
  error?: string;
  status: number;
}

