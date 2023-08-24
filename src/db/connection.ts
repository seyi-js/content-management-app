import { Sequelize } from 'sequelize-typescript';
import { IdbConfig } from './interface';
import { User } from '../modules/user/schema';
import { Post } from '../modules/post/schema';
import { Comment } from '../modules/comment/schema';

const dbConfig = require('./config');

const env: keyof IdbConfig =
  (process.env.NODE_ENV as keyof IdbConfig) || 'development';

const sequelize = new Sequelize({
  ...dbConfig[env],
  sync: { force: false },
  logging: false,
});

sequelize.addModels([User, Post, Comment]);

export default sequelize;
