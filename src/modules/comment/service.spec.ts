import sequelize from '../../db/connection';
import { CommentService } from '../comment/service';
import { PostService } from '../post/service';
import { UserService } from '../user/service';

const commentService = new CommentService();
const userService = new UserService();
const postService = new PostService();

beforeAll(async () => {
  (async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
    } catch (error) {
      console.log(error);
    }
  })();
});

describe('CommentService', () => {
  it('should create a comment', async () => {
    const user = await userService.createUser({
      firstName: 'John',
      lastName: 'Doe',
    });

    const post = await postService.createPost({
      title: 'This is a title',
      content: 'This is a content',
      userId: user.id,
    });

    const comment = await commentService.createComment({
      postId: post.id,
      content: 'This is a comment',
    });

    expect(comment).toHaveProperty('content');
  });

  it("should throw an error if post doesn't exist", async () => {
    await expect(
      commentService.createComment({
        postId: 10000000,
        content: 'This is a comment',
      })
    ).rejects.toThrow('Post not found');
  });
});
