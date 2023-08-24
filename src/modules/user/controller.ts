import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../utils';
import { UserService } from './service';
import { PostService } from '../post/service';
import { UtilService } from '../util/service';

const userService = new UserService();
const postService = new PostService();
const utilService = new UtilService();

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);

    const access_token = await utilService.generateToken(user.id);

    return successResponse(res, 201, 'User created successfully', {
      ...user.toJSON(),
      accessToken: access_token,
    });
  } catch (error: any) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    return successResponse(res, 200, 'Users retrieved successfully', users);
  } catch (error: any) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

export const CreatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await postService.createPost({
      userId: id,
      ...req.body,
    });

    return successResponse(res, 201, 'Post created successfully', post);
  } catch (error: any) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

export const GetUserPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const posts = await postService.getPosts({
      userId: id,
    });

    return successResponse(res, 200, 'Posts retrieved successfully', posts);
  } catch (error: any) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

export const PerformanceChallenge = async (req: Request, res: Response) => {
  try {
    const result = await userService.performanceChallenge();

    return successResponse(res, 200, 'Posts retrieved successfully', result);
  } catch (error: any) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};
