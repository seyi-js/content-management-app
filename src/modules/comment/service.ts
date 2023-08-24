import { WhereOptions } from 'sequelize';
import { Comment } from './schema';
import { IComment } from './interface';
import { PostService } from '../post/service';

export class CommentService {
  private commentSchema = Comment;
  private postService = new PostService();

  async createComment(payload: Pick<IComment, 'content' | 'postId'>) {
    const { content, postId } = payload;

    await this.postService.getPostById(postId);

    const post = await this.commentSchema.create({
      content,
      postId,
    });

    return post;
  }
}
