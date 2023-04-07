export interface AuthState {
  mode: "light" | "dark";
  user: null | User;
  token: null | string;
  posts: Post[];
  baseUrl: undefined | string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: Friend[];
  occupation?: string;
  location?: string;
  viewedProfile?: number;
  impressions?: number;
}

export interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location?: string;
  description?: string;
  picturePath?: string;
  userPicturePath?: string;
  likes?: Map<string, boolean>;
  comments: string[];
}

export interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  occupation?: string;
  picturePath?: string;
}
