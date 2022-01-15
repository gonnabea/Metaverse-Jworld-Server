export interface GetFileInput {
    ownerId: number
  }

export interface GetFileOutput {
    ok: boolean;
    error?: string;
    status: number;
}
  
  