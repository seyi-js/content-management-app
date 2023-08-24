import sequelize from '../../db/connection';
import { CommentService } from '../comment/service';
import { PostService } from '../post/service';
import { UserService } from './service';

const userService = new UserService();
const postService = new PostService();
const commentService = new CommentService();

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

describe('UserService', () => {
  it('should create a user', async () => {
    const user = await userService.createUser({
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(user).toHaveProperty('firstName');
  });

  it('should get a user by id', async () => {
    const user = await userService.getUserById(1);

    expect(user).toHaveProperty('firstName');
  });

  it('should get all users', async () => {
    const users = await userService.getAllUsers();

    expect(users.length).toBeGreaterThan(0);
  });

  it('should get top 3 users with the most posts', async () => {
    const user = await userService.createUser({
      firstName: 'John',
      lastName: 'Doe',
    });

    const posts = [];

    for (let i = 0; i < 5; i++) {
      const post = await postService.createPost({
        userId: user.id,
        content: 'This is a post',
        title: 'Post Title',
      });

      posts.push(post);
    }

    for (const post of posts) {
      await commentService.createComment({
        postId: post.id,
        content: 'This is a comment',
      });
    }

    const users = await userService.performanceChallenge();

    expect(users.length).toBeGreaterThan(0);
  });
});
