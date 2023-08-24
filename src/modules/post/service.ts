import { WhereOptions } from 'sequelize';
import { IPost } from './interface';
import { Post } from './schema';
import { Comment } from '../comment/schema';
import { UserService } from '../user/service';
import { CustomError } from '../../utils';

export class PostService {
  private postSchema = Post;
  private userService = new UserService();

  async createPost(payload: Pick<IPost, 'title' | 'content' | 'userId'>) {
    const { title, content, userId } = payload;

    //validate user exists
    await this.userService.getUserById(userId);

    const post = await this.postSchema.create({
      title,
      content,
      userId,
    });

    return post;
  }

  async getPosts(filter: WhereOptions<IPost>) {
    const posts = await this.postSchema.findAll({
      where: filter,
      include: [
        {
          model: Comment,
        },
      ],
    });

    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postSchema.findByPk(id, {
      include: [
        {
          model: Comment,
        },
      ],
    });

    if (!post) {
      throw new CustomError('Not Found', 404, 'Post not found');
    }

    return post;
  }
}
