import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { IPost } from './interface';
import { User } from '../user/schema';
import { Comment } from '../comment/schema';

@Table({
  modelName: 'Post',
})
export class Post extends Model<IPost, any> {
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
  title!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  content!: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Comment)
  comments!: Comment[];
}
