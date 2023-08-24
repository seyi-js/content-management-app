import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { IComment } from './interface';
import { Post } from '../post/schema';

@Table({
  modelName: 'Comment',
})
export class Comment extends Model<IComment, any> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  content!: string;

  @ForeignKey(() => Post)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  postId!: string;

  @BelongsTo(() => Post)
  post!: Post;
}
