export interface FileWrapper {
  file: File;
  uploadURL?: string;
  uuid: string;
  thumbURL: string;
  progress: number;
  error?: string;
}
