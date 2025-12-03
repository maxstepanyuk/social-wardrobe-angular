/**
 * @deprecated 
 */
export interface UserOld {
  id: number;
  username: string;
  bio: string;
  img: string;
}

export interface UserCreate {
  login: string;
  email: string;

  password: string;

  name?: string;
  image_link?: string;
  image_id?: number;
}

export interface UserResponse {
  login: string;
  email: string;

  name?: string;
  image_link?: string;
  image_id?: number;

  created_at?: Date;
  updated_at?: Date;
}

export interface UserLoginEmailPass {
  email: string;
  password: string;
}
