import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../utils';
import { PostService } from './service';
import { CommentService } from '../comment/service';

const commentService = new CommentService();

export const AddComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await commentService.createComment({
      postId: Number(postId),
      ...req.body,
    });

    return successResponse(res, 201, 'Comment added successfully', post);
  } catch (error: any) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};
