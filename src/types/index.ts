export interface FormData {
    username: string
    email: string
    phoneNumber: string
    password: string
  }    //sign_up data type

export interface LoginForm {
  username: string
  password: string
}

export interface UploadFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}