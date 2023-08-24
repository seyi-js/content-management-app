import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { IUser } from './interface';
import { Post } from '../post/schema';

@Table({
  modelName: 'User',
})
export class User extends Model<IUser, any> {
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
  firstName!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  lastName!: string;

  @HasMany(() => Post)
  posts!: Post[];
}
