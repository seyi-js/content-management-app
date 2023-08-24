import { IComment } from '../comment/interface';

export interface IPost {
  id: number;
  title: string;
  content: string;
  userId: number;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
