export interface AuthModel {
  accessToken: string;
}

export interface UserModel {
  id: string;
  email: string;
  name: string;
  exp: number;
}

export interface SignupRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}
