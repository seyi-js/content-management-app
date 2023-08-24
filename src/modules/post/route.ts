import { Router } from 'express';
import { validateBody, validationRules } from '../../middlewares';
import { AddComment } from './controller';
import { validateToken } from '../../middlewares/verifyToken';

const router = Router();

router.post(
  '/:postId/comments',
  validateToken,
  validationRules('create-comment'),
  validateBody,
  AddComment
);

export default router;
