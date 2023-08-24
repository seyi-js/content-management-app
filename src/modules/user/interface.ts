import { IPost } from '../post/interface';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  posts: IPost[];
  createdAt: Date;
  updatedAt: Date;
}
