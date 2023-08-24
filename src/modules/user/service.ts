import sequelize from '../../db/connection';
import { CustomError } from '../../utils';
import { Post } from '../post/schema';
import { IUser } from './interface';
import { User } from './schema';

export class UserService {
  private userSchema = User;

  async createUser(payload: Pick<IUser, 'firstName' | 'lastName'>) {
    const { firstName, lastName } = payload;

    const user = await this.userSchema.create({
      firstName,
      lastName,
    });

    return user;
  }

  async getUserById(id: number) {
    const user = await this.userSchema.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new CustomError('Not Found', 404, 'User not found');

    return user;
  }

  async getAllUsers() {
    const users = await this.userSchema.findAll({
      include: [
        {
          model: Post,
        },
      ],
    });

    return users;
  }

  async performanceChallenge() {
    const [results, _] = await sequelize?.query(
      `SELECT DISTINCT ON (u.id) u.id AS user_id, u.first_name, u.last_name, c.content AS latest_comment, c.created_at AS comment_created_at
FROM (
    SELECT p.user_id, MAX(c.created_at) AS latest_comment_date
    FROM posts p
    LEFT JOIN comments c ON p.id = c.post_id
    GROUP BY p.user_id
    ORDER BY COUNT(p.id) DESC
    LIMIT 3
) AS top_users_comments
JOIN users u ON top_users_comments.user_id = u.id
JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c ON p.id = c.post_id AND c.created_at = top_users_comments.latest_comment_date
ORDER BY u.id, top_users_comments.latest_comment_date DESC;`
    );

    return results;
  }
}
