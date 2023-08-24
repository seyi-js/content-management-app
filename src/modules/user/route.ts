import { Router } from 'express';
import {
  CreatePost,
  CreateUser,
  GetUserPosts,
  GetUsers,
  PerformanceChallenge,
} from './controller';
import { validateBody, validationRules } from '../../middlewares';
import { validateToken } from '../../middlewares/verifyToken';

const router = Router();

router.post('/', validationRules('create-user'), validateBody, CreateUser);

router.get('/', validateToken, GetUsers);

router.post(
  '/:id/posts',
  validateToken,
  validationRules('create-post'),
  validateBody,
  CreatePost
);

router.get('/:id/posts', validateToken, GetUserPosts);

router.get('/performance-challenge', validateToken, PerformanceChallenge);

export default router;
