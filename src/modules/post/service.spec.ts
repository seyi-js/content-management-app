import sequelize from '../../db/connection';
import { UserService } from '../user/service';
import { PostService } from './service';

const postService = new PostService();
const userService = new UserService();

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

describe('PostService', () => {
  let userId: number;
  it('should create a post', async () => {
    const user = await userService.createUser({
      firstName: 'John',
      lastName: 'Doe',
    });

    const post = await postService.createPost({
      userId: user.id,
      content: 'This is a post',
      title: 'Post Title',
    });

    userId = user.id;
    expect(post).toHaveProperty('title');
  });

  it('should get a post by user id', async () => {
    const post = await postService.getPosts({
      userId,
    });

    expect(post.length).toBeGreaterThan(0);
  });

  it("should throw an error if user doesn't exist", async () => {
    await expect(
      postService.createPost({
        userId: 10000000,
        content: 'This is a comment',
        title: 'Post Title',
      })
    ).rejects.toThrow('User not found');
  });
});
