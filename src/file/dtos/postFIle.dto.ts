export interface PostFileInput {
  title: string;
  description: string;
}

export interface PostFileOutput {
  ok: boolean;
  error?: string;
  status: number;
}

